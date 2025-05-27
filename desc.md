Tabela: tickets
- id
- titulo
- descricao
- prioridade
- categoria_id (nullable)
- data_limite
- status (Aberto | Em andamento | Concluído | Cancelado)
- pdf_recibo_path
- criado_em

Tabela: tarefas
- id
- ticket_id (FK)
- titulo
- descricao
- status (pendente | em progresso | concluída)
- responsavel_id (FK)
- criado_em

Tabela: usuarios
- id
- nome
- email
- area_id (nullable)
- ativo (boolean)

Tabela: notificacoes
- id
- usuario_id
- mensagem
- lida (boolean)
- criada_em
✅ Fluxo Completo de Criação e Gerenciamento de Tickets
🔹 1. Criação do Ticket
Campos obrigatórios: título, descrição, prioridade, data limite

Campo opcional: área (categoria)

🔸 2. Distribuição de Tarefas (automática ou manual)
🟢 Se o ticket tiver área definida:
O sistema atribui automaticamente uma ou mais tarefas com base na regra:

Responsável com menor número de tarefas pendentes/em progresso

Se só houver um funcionário da área → ele é escolhido

As tarefas são criadas automaticamente com o responsável

O ticket já começa com pelo menos 1 tarefa associada

🔴 Se o ticket NÃO tiver área definida:
Nenhuma tarefa é criada automaticamente

O responsável (funcionário) deve criar manualmente as tarefas associadas ao ticket

🧠 Regras sobre tarefas
Um ticket pode ter várias tarefas apenas se não tiver área definida

Se tiver área, o sistema cria automaticamente uma ou mais tarefas, conforme configurado

Cada tarefa tem:

Status: pendente, em progresso, concluída

Relacionamento com o ticket

⏰ No dia final (data limite do ticket):
O sistema verifica:

Se alguma tarefa associada ao ticket está ainda aberta (pendente ou em progresso)

Se houver funcionários ativos na área desse ticket

📣 Ações:
Envia notificação ou e-mail para:

O(s) funcionário(s) envolvidos

O administrador

O ticket é marcado como cancelado automaticamente

Só o administrador pode reabrir o ticket

🧩 Modelo de Banco de Dados (com esses novos campos)
ts
Copy
Edit
Tabela: tickets
- id
- titulo
- descricao
- prioridade
- categoria_id (nullable)
- data_limite
- status (Aberto | Em andamento | Concluído | Cancelado)
- pdf_recibo_path
- criado_em

Tabela: tarefas
- id
- ticket_id (FK)
- titulo
- descricao
- status (pendente | em progresso | concluída)
- responsavel_id (FK)
- criado_em

Tabela: usuarios
- id
- nome
- email
- area_id (nullable)
- ativo (boolean)

Tabela: notificacoes
- id
- usuario_id
- mensagem
- lida (boolean)
- criada_em
⚙️ Lógica no código
Verificação diária de tickets
ts
Copy
Edit
function verificarTicketsNoPrazo() {
  const hoje = dataAtual();
  const tickets = buscarTicketsComDataLimite(hoje);

  for (const ticket of tickets) {
    const tarefasAbertas = buscarTarefasAbertasPorTicket(ticket.id);

    if (tarefasAbertas.length > 0) {
      const funcionarios = buscarFuncionariosPorCategoria(ticket.categoria_id);

      if (funcionarios.length > 0) {
        notificar(funcionarios, `Ticket #${ticket.id} está em atraso!`);
        notificar(admins, `Ticket #${ticket.id} está em atraso e foi cancelado.`);
        cancelarTicket(ticket.id);
      }
    }
  }
}
🚀 Próximos passos
Quer ajuda para implementar:

Geração do PDF?

Lógica do sistema em backend (Node.js/NestJS)?

Envio automático de e-mail/notificação?

Painel do admin para reabrir ticket?

Me diga qual parte você quer que eu escreva o código ou modelo agora.








