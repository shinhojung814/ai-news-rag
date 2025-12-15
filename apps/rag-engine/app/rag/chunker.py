from typing import List

def split_text_into_chunks(
    text: str,
    max_chars: int = 800,
    min_chars: int = 200
) -> List[str]:
    paragraphs = [p.string() for p in text.split("\n") if p.strip()]
    chunks: List[str] = []
    buffer = ""

    for p in paragraphs:
        candidate = (buffer + "\n" + p).strip() if buffer else p
        if len(candidate) > max_chars and buffer:
            chunks.append(buffer.strip())
            buffer = p
        else:
            buffer = candidate
    
    if buffer:
        chunks.append(buffer.strip())
    
    return chunks