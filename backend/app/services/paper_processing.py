import os
import openai
import json
import networkx as nx
import matplotlib.pyplot as plt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import configparser

# use config
config = configparser.ConfigParser()
config.read('config.ini')
openai.api_key = config['openai']['api_key']

# 定义本地文件夹路径
local_summary_folder = "paper_summary"
local_chart_folder = "paper_chart"
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
    
    # 检查本地文件夹是否存在，如果不存在则创建它
    os.makedirs(local_chart_folder, exist_ok=True)
    
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
            if similarity > 0.5:  # 根据相似度阈值确定是否添加边
                G.add_edge(i, j, weight=similarity)

    # 设置节点和边的颜色和大小
    node_colors = [1 - (int(entry['year']) - 2022) / (2023 - 2022) for entry in entries]
    edge_colors = [1 - G[u][v]['weight'] for u, v in G.edges()]
    edge_weights = [G[u][v]['weight'] * 5 for u, v in G.edges()]

    # 绘制网络图
    pos = nx.spring_layout(G, seed=42)  # 使用Spring布局算法布局图
    nx.draw(G, pos, with_labels=True, node_color=node_colors, cmap='viridis', node_size=3000, font_size=8, font_color='black', edge_color=edge_colors, width=edge_weights)

    # 添加颜色条
    sm = plt.cm.ScalarMappable(cmap='viridis', norm=plt.Normalize(vmin=0, vmax=1))
    sm.set_array([])
    ax = plt.gca()  # 获取当前的轴
    cbar = plt.colorbar(sm, ax=ax, label='年份越新，颜色越深')


    # 保存图像到本地文件夹
    chart_filename = 'network_graph.png'
    chart_path = os.path.join(local_chart_folder, chart_filename)
    plt.savefig(chart_path, format='png', bbox_inches='tight')
    
    # 返回图像文件的URL
    return chart_path

def get_comparison_by_entries(entries):
    prompt_text = f"Please help me compare these paper: {entries}"
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt_text,
        max_tokens=1000
    )
    result = response["choices"][0]["text"].strip()
    return result