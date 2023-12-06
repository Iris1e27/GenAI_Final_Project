# Welcome to Research Hive

Here is an instruction about how to use this app.

## 1. Upload papers

Click 'Upload BibTex' in the sidebar to upload your BibTex file (in .bib format) which is typically generated from [Zotero](https://www.zotero.org/). 

## 2. Select only one paper

After selecting a single paper, the user can:
1. Check Detail: Access detailed information about the paper, such as authors, publication year, abstract, and keywords.
2. Read Paper: Open a full-text version of the paper, if available, for in-depth reading.
3. (GPT) Generate Summary: Automatically create a concise summary of the paper's main points, findings, and conclusions. 
4. Delete Entry: Remove the paper from the ResearchHive database if it's no longer needed or relevant.

## 3. Select more than one paper

When multiple papers are selected, the user can:
1. (GPT) Categorize Themes: Organize the selected papers into different themes or categories based on their topics, methodologies, or findings.
2. (NLP) Generate Chart: This feature allows users to create visual charts that illustrate the relationships and patterns among the selected research papers. The app employs advanced text analysis techniques, specifically TF-IDF (Term Frequency-Inverse Document Frequency) and cosine similarity, to evaluate the similarity between papers.
   - TF-IDF is a numerical statistic that reflects how important a word is to a document in a collection. It helps in understanding the relevance of words within each paper, enhancing the accuracy of similarity assessments.
   - Cosine Similarity measures the cosine of the angle between two non-zero vectors in a multi-dimensional space. In the context of this app, it is used to quantify the similarity between two papers based on their TF-IDF vectors. The closer the cosine value is to 1, the greater the similarity between the papers.
   - The resultant chart visually represents these similarities, using links and clustering to show how closely related different papers are to each other. This feature is particularly useful for identifying clusters of research on similar topics, trends in research over time, and potential gaps in the literature.

## 4. Reset and Upload

You can use this to clear all papers or upload more papers. 