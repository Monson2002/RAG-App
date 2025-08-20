from flask import Flask, request, jsonify
from chroma import get_chroma_collection
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route("/api/documents/", methods=["POST"])
def add_documents():
    try:
        request_body = request.get_json()
        ids = request_body.get('ids')
        documents = request_body.get('documents')
        metadatas = request_body.get('metadatas')
        
        collection = get_chroma_collection()

        collection.add(
            ids=ids,
            documents=documents,
            metadatas=metadatas,
        )
        return jsonify({"message": "Documents added successfully", "ids": ids}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/api/search/", methods=["POST"])
def search_documents():
    try:
        request_body = request.get_json()
        query = request_body.get("query")
        n_results = request_body.get("n_results", 5)  # 5 relevant chunks

        if not query:
            return jsonify({"error": "Missing query text"}), 400

        collection = get_chroma_collection()
        results = collection.query(
            query_texts=[query],
            n_results=n_results
        )

        return jsonify({
            "query": query,
            "results": results
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)