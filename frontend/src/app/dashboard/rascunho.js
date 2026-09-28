"use client"; // Necessário no Next.js App Router para componentes interativos
import { useState } from "react";

export default function EditableWordList() {
  // Lista inicial de palavras
  const [words, setWords] = useState(["Next.js", "React", "JavaScript"]);

  // Estado para controlar qual índice está sendo editado
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempValue, setTempValue] = useState("");

  // Função para iniciar edição
  const handleEdit = (index) => {
    setEditingIndex(index);
    setTempValue(words[index]);
  };

  // Função para salvar edição
  const handleSave = () => {
    if (tempValue.trim() === "") return; // Evita salvar vazio
    const updatedWords = [...words];
    updatedWords[editingIndex] = tempValue;
    setWords(updatedWords);
    setEditingIndex(null);
    setTempValue("");
  };

  // Função para cancelar edição
  const handleCancel = () => {
    setEditingIndex(null);
    setTempValue("");
  };

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <h2>Lista de Palavras</h2>
      <ul>
        {words.map((word, index) => (
          <li key={index} style={{ marginBottom: "8px" }}>
            {editingIndex === index ? (
              <>
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave();
                    if (e.key === "Escape") handleCancel();
                  }}
                />
                <button onClick={handleSave}>Salvar</button>
                <button onClick={handleCancel}>Cancelar</button>
              </>
            ) : (
              <span
                style={{ cursor: "pointer", color: "blue" }}
                onClick={() => handleEdit(index)}
              >
                {word}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}


/*Como funciona:

editingIndex guarda qual palavra está sendo editada.
Ao clicar na palavra, o estado muda e o input aparece no lugar dela.
O usuário pode:

Salvar (Enter ou botão) → atualiza a lista.
Cancelar (Esc ou botão) → volta ao estado original.


O autoFocus garante que o campo já esteja pronto para digitar.


Melhorias possíveis:

Integrar com API Routes do Next.js para salvar no banco.
Adicionar validação mais avançada.
Usar debounce para salvar automaticamente enquanto digita.


Se quiser, posso te mostrar a versão com API Route para que a atualização da palavra já seja salva no servidor no Next.js.
Quer que eu faça essa versão?*/
