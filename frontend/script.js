const API_URL = "http://localhost:5000/students"; // URL do backend

document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById("studentForm");
    const studentList = document.getElementById("studentList");
    const API_URL = "http://localhost:5000/students"; // URL do backend


    // Função para carregar alunos
    const loadStudents = async () => {
        try {
            const response = await fetch(API_URL);
            const students = await response.json();
            studentList.innerHTML = "";
            students.forEach(student => {
                const li = document.createElement("li");
                li.innerHTML = `${student.nome} - ${student.email} - ${student.curso}
                    <button onclick="deleteStudent('${student._id}')">Excluir</button>`;
                studentList.appendChild(li);
            });
        } catch (error) {
            console.error("Erro ao carregar alunos:", error);
        }
    };

    // Evento de envio do formulário
    studentForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const studentData = {
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            curso: document.getElementById("curso").value,
            periodo: document.getElementById("periodo").value,
            turma: document.getElementById("turma").value,
            turno: document.getElementById("turno").value,
            endereco: document.getElementById("endereco").value,
            telefone: document.getElementById("telefone").value
        };

        try {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(studentData)
            });
            studentForm.reset();
            loadStudents();
        } catch (error) {
            console.error("Erro ao cadastrar aluno:", error);
        }
    });

    // Função para excluir aluno
    window.deleteStudent = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            loadStudents();
        } catch (error) {
            console.error("Erro ao excluir aluno:", error);
        }
    };

    loadStudents();
});
