# 📋 Sistema de Registo de Tarefas - Enna

Sistema desenvolvido para técnicos de help desk da **Enna**, com o objetivo de organizar e monitorar atividades diárias, semanais e mensais de forma eficiente.

---

## 🚀 Funcionalidades Principais

### 📅 Registo Diário de Tarefas

Cada técnico pode registrar as tarefas realizadas durante o dia:

- Data e hora de início e fim da tarefa
- Descrição detalhada do serviço prestado
- Número do ticket ou solicitação (se aplicável)
- Cliente ou departamento atendido
- Tipo de problema ou categoria da tarefa
- Tempo gasto (calculado ou manual)
- Status da tarefa: `Pendente`, `Em Progresso`, `Concluída`, `Cancelada`
- Prioridade: `Alta`, `Média`, `Baixa`
- Notas ou comentários adicionais
- Upload de ficheiros relevantes (ex: logs, capturas de ecrã)

### 👀 Visualização do Registo Diário

- Visualização das tarefas do dia atual por técnico
- Filtros por: hora de início, status, prioridade, entre outros

---

### 📈 Controlo Semanal

#### 📤 Relatório Semanal Individual

- Geração automática de relatório com:
  - Total de tarefas concluídas na semana
  - Tempo total de trabalho
  - Detalhes das tarefas concluídas
  - Filtros por tipo, cliente, categoria, etc.

#### 📊 Visualização do Resumo Semanal

- Métricas de desempenho semanal
- Histórico de semanas anteriores

---

### 📅 Controlo Mensal

#### 📤 Relatório Mensal Individual

- Relatório automático com:
  - Total de tarefas concluídas no mês
  - Tempo total gasto
  - Tarefas agrupadas por semana ou categoria
  - Comparação com meses anteriores (opcional)

#### 📊 Visualização do Resumo Mensal

- Métricas mensais e histórico dos meses anteriores

---

## 🛡️ Funcionalidades Adicionais

- **🔐 Autenticação e Autorização:** Acesso restrito por técnico
- **🔎 Pesquisa Avançada:** Filtro por técnico, cliente, data, tipo de problema, ticket, palavras-chave, etc.
- **📤 Exportação de Dados:** Exportação de registos e relatórios em `.CSV`, `.Excel`, `.PDF`
- **🖥️ Interface Intuitiva:** Design limpo e fácil de usar
- **📱 Responsividade:** Compatível com desktop, tablet e mobile

---

## 🔧 Requisitos Técnicos

> Este sistema pode ser desenvolvido com qualquer stack moderna. Recomendamos:

- **Frontend:** React.js / Vue.js / Angular
- **Backend:** Node.js (NestJS ou Express) / Laravel / Django
- **Banco de Dados:** PostgreSQL / MySQL / MongoDB
- **Autenticação:** JWT / OAuth
- **Relatórios:** PDFKit, ExcelJS, ou similares

---

## 📌 Observações Finais

Este sistema foi idealizado para atender às necessidades específicas dos técnicos da **Enna**, promovendo produtividade, organização e controle de desempenho.  
A integração com boas práticas de **segurança, usabilidade e desempenho** é essencial para garantir sua eficácia e confiabilidade.

---

## 📄 Licença

Este projeto é privado e de uso interno da Enna.
