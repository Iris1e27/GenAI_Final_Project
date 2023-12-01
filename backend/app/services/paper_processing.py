import os
import openai
import json
import networkx as nx
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import configparser
import numpy as np
import time

# use config
config = configparser.ConfigParser()
config.read('config.ini')
openai.api_key = config['openai']['api_key']

# 定义本地文件夹路径
local_summary_folder = "paper_summary"
local_chart_folder = "images"
# comparison result will not be saved

# 创建函数以获取摘要
def get_summary_by_entry(entry):
    # 构建本地文件路径，假设文件名与 entry.ID 相关
    print("entry: "+str(entry))
    local_summary_file = os.path.join(local_summary_folder, f"{entry['ID']}.json")
    
    # 检查本地文件夹是否存在，如果不存在则创建它
    os.makedirs(local_summary_folder, exist_ok=True)
    
    # 检查本地文件是否存在
    if os.path.exists(local_summary_file):
        # 如果存在，从本地文件中读取摘要并返回
        with open(local_summary_file, "r") as f:
            summary_data = json.load(f)
        return summary_data.get("summary", "")
    else:
        # 如果本地文件不存在，调用 OpenAI API 生成摘要
        prompt_text = f"Please help me make a short summary based on this bib entry: {entry}"
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt_text,
            max_tokens=1000
        )
        generated_summary = response["choices"][0]["text"].strip()

        # 将生成的摘要保存到本地文件
        os.makedirs(local_summary_folder, exist_ok=True)
        with open(local_summary_file, "w") as f:
            json.dump({"summary": generated_summary}, f)

        return generated_summary


def get_chart_by_entries(entries):
    os.makedirs(local_chart_folder, exist_ok=True)

    plt.rcParams['font.family'] = 'Microsoft YaHei'

    # 创建一个空的图
    G = nx.Graph()

    # 计算文本相似度
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform([entry['abstract'] for entry in entries])
    similarity_matrix = cosine_similarity(tfidf_matrix)

    # 添加节点和边
    for i, entry in enumerate(entries):
        G.add_node(i, label=entry['title'], year=entry['year'], author=', '.join(entry['author']))
        for j in range(i + 1, len(entries)):
            similarity = similarity_matrix[i, j]
            G.add_edge(i, j, weight=similarity)

    # 设置节点和边的颜色和大小
    current_year = max([int(entry['year']) for entry in entries])
    node_colors = [(current_year - int(entry['year'])) / (current_year) for entry in entries]
    edge_colors = [G[u][v]['weight'] for u, v in G.edges()]
    edge_weights = [G[u][v]['weight'] * 5 for u, v in G.edges()]

    # 绘制网络图
    pos = nx.spring_layout(G, seed=42)
    nx.draw(G, pos, node_color=node_colors, cmap='cividis', node_size=3000, font_size=8, font_color='black', edge_color=edge_colors, width=edge_weights)

    # 添加自定义标签（作者和年份）
    labels = {}
    for i, entry in enumerate(entries):
        labels[i] = f"\n\n{entry['ID']}\n\n{entry['author'][0]}, ({entry['year']})"
    nx.draw_networkx_labels(G, pos, labels, font_size=6, 
                        bbox=dict(facecolor='white', alpha=0.6, edgecolor='none'))

    # 获取相似度矩阵的最小和最大值
    min_similarity = np.min(similarity_matrix)
    max_similarity = np.max(similarity_matrix)
    print("min_similarity:"+str(max_similarity))
    print("max_similarity:"+str(max_similarity))

    # 创建相似度颜色条
    similarity_norm = plt.Normalize(vmin=min_similarity, vmax=max_similarity)
    similarity_sm = plt.cm.ScalarMappable(cmap='plasma_r', norm=similarity_norm)
    similarity_sm.set_array([])
    ax = plt.gca()
    similarity_cbar = plt.colorbar(similarity_sm, ax=ax, orientation='vertical', fraction=0.046, pad=0.09)
    similarity_cbar.set_label('Similarity')

    # 保存图像到本地文件夹 
    chart_filename = str(time.time())+'_network_graph.png'
    chart_path = os.path.join(local_chart_folder, chart_filename)
    
    # 如果文件已存在，则删除
    if os.path.exists(chart_path):
        os.remove(chart_path)
    print(os.getcwd() + chart_path)
    plt.savefig(chart_path, format='png', bbox_inches='tight')
    
    # 关闭当前的图形
    plt.close()

    # 返回图像文件的URL
    return chart_path


def get_comparison_by_entries(entries):
    papers_text = "\n\n".join([f"**{entry['title']}**:\n{entry['abstract']}" for entry in entries])
    prompt_text = f"""
        I have a list of papers that having relationship among them: like share similar findings, unveiling new research questiosn and gaps, presenting opposite findings, things like this. 
        Here are their titles and abstracts: 
        {papers_text}
        Please help me compare these paper and find relationships among them.
        Format:
        **Paper 1 and Paper 2**: Relationship.\n
        **Paper 2 and Paper 3**: Relationship.\n
        **Paper 1 and Paper 3**: Relationship.\n
        ... and so on.
        """
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt_text,
        max_tokens=1000
    )
    result = response["choices"][0]["text"].strip()
    return result


def get_categories_by_entries(entries):
    papers_text = "\n\n".join([f"**{entry['title']}**:\n{entry['abstract']}" for entry in entries])
    prompt_text = f"""
        I've gathered academic materials for my research. Here are their titles and abstracts:
        {papers_text}
        First, group materials into themes. Name each theme according to the papers' contributions.
        Second, rank papers based on relevance and tell users which one is worth to read.
        Third, Summarize**: Ooffer a concise summary for each, focusing on findings, methods, and conclusions.
        Output Format like this:
        - **Theme 1**: ...\n
            **Title of Paper 1**: Summary.\n
            **Title of Paper 2**: Summary.\n
            ... and so on.\n
        - **Theme 2**:\n
            **Title of Paper 1**: Summary.\n
            **Title of Paper 2**: Summary.\n
            ... and so on.\n
        """
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt_text,
        max_tokens=1000
    )
    result = response.choices[0].text.strip()
    return result


