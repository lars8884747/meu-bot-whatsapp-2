const fs = require('fs');
const path = require('path');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const PLANOS_PATH = path.join(__dirname, 'planos.json');
const ANTICONCORRENCIA_PATH = path.join(__dirname, 'anticoncorrencia.json');
const COMANDOS_PATH = path.join(__dirname, 'comandos.json');
const COMPRAS_PATH = path.join(__dirname, 'compras.json');
const CONCORRENTES_PATH = path.join(__dirname, 'concorrentes.json');
const antilinkPath = path.join(__dirname, 'antilink.json');
 const palavrasFilePath = path.join(__dirname, 'palavras.json');

let palavrasProibidas = [];
try {
  const data = fs.readFileSync(PALAVRAS_PATH, 'utf8');
  palavrasProibidas = JSON.parse(data);
  if (!Array.isArray(palavrasProibidas)) {
    palavrasProibidas = [];
  }
  console.log('✅ Palavras proibidas carregadas!');
} catch (err) {
  console.warn('⚠️ Nenhuma palavra proibida carregada. Criando lista vazia.');
  palavrasProibidas = [];
}
// 💾 Função para salvar as palavras proibidas no arquivo
function salvarPalavrasProibidas() {
  try {
    fs.writeFileSync(PALAVRAS_PATH, JSON.stringify(palavrasProibidas, null, 2));
    console.log('✅ Palavras proibidas salvas!');
  } catch (err) {
    console.error('❌ Erro ao salvar palavras proibidas:', err);
  }
}
function salvarPalavrasProibidas(lista) {
  const filePath = path.join(__dirname, 'palavras_proibidas.json');

  if (!Array.isArray(lista) && typeof lista !== 'object') {
    console.warn('⚠️ salvarPalavrasProibidas: argumento inválido.');
    lista = {};
  }

  try {
    fs.writeFileSync(filePath, JSON.stringify(lista, null, 2));
    console.log('✅ Palavras proibidas salvas com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao salvar palavras proibidas:', err.message);
  }
}




let sistemaComprasAtivo = {};
if (fs.existsSync(COMPRAS_PATH)) {
  sistemaComprasAtivo = JSON.parse(fs.readFileSync(COMPRAS_PATH, 'utf-8'));
}


// Carrega ou inicializa configs salvas
let audiosConfig = {};
let palavrasConfig = {};

// Tenta ler arquivos JSON se existirem, para manter estado salvo
try {
  audiosConfig = JSON.parse(fs.readFileSync('./audioStatus.json', 'utf8'));
} catch {
  audiosConfig = {};
}
try {
  palavrasConfig = JSON.parse(fs.readFileSync('./palavrasStatus.json', 'utf8'));
} catch {
  palavrasConfig = {};
}

const caminhoPalavras = './palavrasProibidas.json';
if (fs.existsSync(COMPRAS_PATH)) {
  sistemaComprasAtivo = JSON.parse(fs.readFileSync(COMPRAS_PATH, 'utf-8'));
}


// Função para ler JSON com fallback
function readJsonSafe(filePath, fallback = {}) {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Erro ao ler ${filePath}:`, err.message);
    return fallback;
  }
}

// Função para salvar JSON
function writeAntilink(data) {
  fs.writeFileSync(antilinkPath, JSON.stringify(data, null, 2));
}

// Declara e carrega o estado do antilink
let antilinkData = readJsonSafe(antilinkPath, {});



// Variável global das palavras proibidas

// 🔁 Função para carregar as palavras proibidas
function carregarPalavras() {
  try {
    const data = fs.readFileSync(PALAVRAS_PATH, 'utf-8');
    palavrasProibidas = JSON.parse(data);
    if (!Array.isArray(palavrasProibidas)) {
      console.warn('⚠️ Arquivo de palavras proibidas não é um array. Redefinindo.');
      palavrasProibidas = [];
    }
  } catch (err) {
    console.warn('⚠️ Erro ao carregar palavras proibidas, criando lista vazia.');
    palavrasProibidas = [];
  }
}


try {
  const dados = fs.readFileSync(path.join(__dirname, 'palavras_proibidas.json'), 'utf8');
  const json = JSON.parse(dados);
  if (Array.isArray(json)) palavrasProibidas = json;
} catch {
  palavrasProibidas = [];
}

// 📅 Função para formatar datas no formato dd/mm/yyyy
function formatDate(date) {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

// 📚 Função genérica segura para ler arquivos JSON
function readJsonSafe(filePath, fallback = {}) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    console.warn(`⚠️ Erro ao ler ${filePath}, usando padrão.`);
    return fallback;
  }
}

// Inicialização: carregar palavras no início
carregarPalavras();

// ✅ Carregar outros arquivos JSON
palavrasProibidas = ["vai te lixar", "fdpt", "crlh"];
salvarPalavrasProibidas(palavrasProibidas);
let config = { grupos: {} };


// Formatação de datas e cálculo de dias
function formatDate(d) {
    return d.toLocaleDateString('pt-PT');
}

function diasDesde(timestamp) {
    if (!timestamp) return null;
    const hoje = new Date();
    const last = new Date(timestamp);
    const diffTime = hoje - last;
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}



// Ler antilink
function readAntilink() {
  try {
    return JSON.parse(fs.readFileSync('./antilink.json', 'utf-8'));
  } catch (err) {
    console.error('Erro ao ler antilink.json:', err.message);
    return {};
  }
}

// 🔧 Função writeAntilink
function writeAntilink(groupId, status) {
    const filePath = path.join(__dirname, 'antilink.json');
    let data = {};

    if (fs.existsSync(filePath)) {
        data = JSON.parse(fs.readFileSync(filePath));
    }

    data[groupId] = status;

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}


// Estrutura para contar infrações
const contadoresAntifraude = {};

// Função para carregar palavras proibidas com validação
function carregarPalavrasProibidas() {
  try {
    if (!fs.existsSync(palavrasFilePath)) {
      // Se não existir o arquivo, cria com array vazio
      fs.writeFileSync(palavrasFilePath, JSON.stringify([]));
      return [];
    }

    const data = fs.readFileSync(palavrasFilePath, 'utf-8');
    const json = JSON.parse(data);

    if (!Array.isArray(json)) {
      console.warn('⚠️ Arquivo de palavras proibidas não é um array. Redefinindo.');
      fs.writeFileSync(palavrasFilePath, JSON.stringify([]));
      return [];
    }

    return json;
  } catch (error) {
    console.error('❌ Erro ao carregar palavras proibidas:', error);
    fs.writeFileSync(palavrasFilePath, JSON.stringify([]));
    return [];
  }
}

// Carrega as palavras proibidas no início
palavrasProibidas = carregarPalavrasProibidas();

// Função para salvar as palavras proibidas (já tem no seu código)
function salvarPalavrasProibidas() {
  try {
    fs.writeFileSync(palavrasFilePath, JSON.stringify(palavrasProibidas, null, 2));
    console.log('✅ Palavras proibidas salvas!');
  } catch (err) {
    console.error('❌ Erro ao salvar palavras proibidas:', err);
  }
}

// Funções utilitárias
function readJsonSafe(filePath, defaultValue = {}) {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultValue, null, 2));
      return defaultValue;
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error(`Erro ao ler ${filePath}:`, err.message);
    return defaultValue;
  }
}

function writeJsonSafe(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error(`Erro ao salvar ${filePath}:`, err.message);
  }
}

// ----------- Concorrentes -----------
function readConcorrentes() {
  const dados = readJsonSafe(CONCORRENTES_PATH, { concorrentes: [] });
  if (!Array.isArray(dados.concorrentes)) dados.concorrentes = [];
  return dados;
}

function saveConcorrentes(data) {
  writeJsonSafe(CONCORRENTES_PATH, data);
}

function adicionarConcorrente(numero) {
  const dados = readConcorrentes();
  const codificado = Buffer.from(numero).toString('base64');
  if (!dados.concorrentes.includes(codificado)) {
    dados.concorrentes.push(codificado);
    saveConcorrentes(dados);
  }
}

function listarConcorrentes() {
  const dados = readConcorrentes();
  return dados.concorrentes.map(c => Buffer.from(c, 'base64').toString('utf-8'));
}

// ----------- Anticoncorrência -----------
function toggleAnticoncorrencia(groupId, ativar) {
  const dados = readJsonSafe(ANTICONCORRENCIA_PATH);
  if (!dados[groupId]) dados[groupId] = { ativo: false, numeros: [] };
  dados[groupId].ativo = ativar;
  writeJsonSafe(ANTICONCORRENCIA_PATH, dados);
}

function isAnticoncorrenciaAtivo(groupId) {
  const dados = readJsonSafe(ANTICONCORRENCIA_PATH);
  return dados[groupId]?.ativo || false;
}

function adicionarConcorrenteGrupo(groupId, numero) {
  const dados = readJsonSafe(ANTICONCORRENCIA_PATH);
  if (!dados[groupId]) dados[groupId] = { ativo: true, numeros: [] };
  if (!dados[groupId].numeros.includes(numero)) {
    dados[groupId].numeros.push(numero);
    writeJsonSafe(ANTICONCORRENCIA_PATH, dados);
  }
}

function getConcorrentesGrupo(groupId) {
  const dados = readJsonSafe(ANTICONCORRENCIA_PATH);
  return dados[groupId]?.numeros || [];
}

// ----------- Planos -----------
function readPlanos() {
  return readJsonSafe(PLANOS_PATH);
}

function grupoComPlanoValido(groupId) {
  const planos = readPlanos();
  const grupo = planos[groupId];
  if (!grupo) return false;
  const agora = Date.now();
  return grupo.validade > agora;
}
// 🔧 Esta é a função que você precisa definir
function writePlanos(planos) {
  writeJsonSafe(PLANOS_PATH, planos);
}

// ----------- Comandos -----------
let comandos = readJsonSafe(COMANDOS_PATH);
if (!comandos.revendedor) comandos.revendedor = {};
if (!comandos.fornecedor) comandos.fornecedor = {};
if (!comandos.gerais) comandos.gerais = {};
let comandosAtivos = { ...comandos.gerais };

// ----------- Compras -----------
let comprasData = readJsonSafe(COMPRAS_PATH);

// ----------- Controle interno (modo edição, etc) -----------
let modoEdicaoAtivo = false;
let categoriaEdicao = null;
let modoEdicaoPalavras = false;



// Cria cliente whatsapp-web.js
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

client.on('qr', qr => qrcode.generate(qr, { small: true }));
client.on('ready', () => console.log('🤖 Bot está pronto!'));

client.on('disconnected', (reason) => {
    console.log('🔌 Cliente desconectado:', reason);
    tentarReconectar();
});

client.on('auth_failure', msg => {
    console.error('❌ Falha na autenticação:', msg);
    tentarReconectar();
});

client.on('change_state', (state) => {
    console.log('📶 Estado do cliente:', state);
});

function tentarReconectar() {
    console.log('🔄 Tentando reconectar em 5 segundos...');
    setTimeout(() => {
        client.initialize().catch(err => {
            console.error('❌ Erro ao tentar reconectar:', err);
        });
    }, 5000);
}

process.on('uncaughtException', (err) => {
    console.error('🔥 Erro não tratado:', err);
});
process.on('unhandledRejection', (reason, p) => {
    console.error('🔥 Rejeição não tratada em Promise:', reason);
});

// Listener principal para mensagens
client.on('message', async msg => {
    try {
  const chat = await msg.getChat();
 const contact = await msg.getContact();
 const senderId = contact.id._serialized;
const sender = contact; 
const antilinkData = readAntilink();
const groupId = chat.id._serialized;
const message = msg.body.trim().toLowerCase();
// Parte superior do handler
let participante = null;

if (chat.isGroup && chat.participants) {
    participante = chat.participants.find(p => p.id._serialized === senderId);
}

const isGroupAdmin = participante?.isAdmin || false;
const isDono = senderId === '258853155736@c.us';

// Bloqueio global de grupo sem plano (exceto .id)
  if (chat.isGroup && message !== '.id') {
    const planos = readPlanos();
    const grupoId = msg.from;
    const plano = planos[grupoId];
    const agora = new Date();

    if (!plano || new Date(plano.validade) < agora) {
      await msg.reply('❌ Seu plano expirou. Por favor, renove seu plano com o gestor do bot.');
      return; // Bloqueia o restante dos comandos
    }
  }

        // Responder imagem em grupo
        if (msg.type === 'image' && msg.from.endsWith('@g.us')) {
            const userTag = `@${sender.number}`;
            const resposta = `*💳 Pagamento Detectado!*\n\n⏳ ${userTag} _Aguarde alguns instantes enquanto o admin confirma o seu pagamento._\n\n💡 \`Qualquer tentativa de enviar comprovativos falsos, resulta em banimento!\`\n\n✅ _Até já!!!_ 🚀`;

            await chat.sendMessage(resposta, {
                mentions: [sender]
            });
        }

        // Verifica se é grupo e se bot é admin, senão ignora
        if (chat.isGroup) {
            const senderId = msg.author || msg.from;
            const botNumber = client.info.wid._serialized;
            const euMesmo = chat.participants.find(p => p.id._serialized === botNumber);
            if (!euMesmo?.isAdmin) {
                console.log(`⛔ Ignorando grupo "${chat.name}" - bot não é admin.`);
                return;
            }
        }

              const chatId = chat.id._serialized;

        // Modo edição de comandos revendedor/fornecedor
        if (modoEdicaoAtivo && (categoriaEdicao === 'revendedor' || categoriaEdicao === 'fornecedor')) {
            if (message.toLowerCase() === '.fim') {
                modoEdicaoAtivo = false;
                categoriaEdicao = null;
                writeJsonSafe(COMANDOS_PATH, comandos);
                await msg.reply('✅ Modo edição encerrado e comandos salvos!');
                return;
            }

            const separadorIndex = message.indexOf(',');

            if (separadorIndex === -1) {
                await msg.reply('❗ Formato inválido. Use: gatilho, resposta');
                
            }

            const gatilho = message.slice(0, separadorIndex).trim().toLowerCase();
            const resposta = message.slice(separadorIndex + 1).trim();

            if (!gatilho || !resposta) {
                await msg.reply('❗ Formato inválido. Use: gatilho, resposta');
                return;
            }

            comandos[categoriaEdicao][gatilho] = resposta;
            await msg.reply(`✅ Comando adicionado em *${categoriaEdicao}*\n\n🔹 *${gatilho}* → ${resposta}`);
            return;
        }

        const comando = msg.body.toLowerCase().trim();

        // Comando .ver [categoria]
        if (comando.startsWith('.ver ')) {
            if (senderId !== '258853155736@c.us') {
    await msg.reply('❌ Apenas o dono do bot pode usar esse comando.');
    return;
  }
            const categoria = comando.split(' ')[1]?.toLowerCase();
            const comandosAtualizados = readJsonSafe('./comandos.json');

            const categoriasValidas = ['revendedor', 'fornecedor', 'gerais'];

            if (!categoriasValidas.includes(categoria)) {
                await msg.reply('❌ Categoria inválida. Use: `.ver revendedor`, `.ver fornecedor` ou `.ver gerais`.');
                return;
            }

            const lista = comandosAtualizados[categoria] || {};

            if (Object.keys(lista).length === 0) {
                await msg.reply(`⚠️ Nenhum comando encontrado para a categoria *${categoria.charAt(0).toUpperCase() + categoria.slice(1)}*.`);
                return;
            }

            let resposta = `📦 *Comandos da categoria: ${categoria.charAt(0).toUpperCase() + categoria.slice(1)}*\n\n`;
            for (const gatilho in lista) {
                const respostaComando = lista[gatilho];
                resposta += `🟢 *Gatilho:* ${gatilho}\n💬 *Resposta:* ${respostaComando.slice(0, 80)}${respostaComando.length > 80 ? '...' : ''}\n\n`;
            }
            resposta += `🧾 Total de comandos: ${Object.keys(lista).length}`;
            await msg.reply(resposta);
            return;
        }

// Comando para ver palavras proibidas
if (message === '.verpalavras' && chat.isGroup) {
 const participante = chat.participants.find(p => p.id._serialized === senderId);
    if (!participante?.isAdmin) {
        await msg.reply('❌ Apenas administradores podem usar este comando.');
        return;
    }

  const palavras = palavrasProibidas[groupId]?.lista || [];

  if (palavras.length === 0) {
    await msg.reply('✅ Nenhuma palavra proibida foi adicionada ainda neste grupo.');
  } else {
    await msg.reply(`📛 Lista de palavras proibidas neste grupo:\n\n- ${palavras.join('\n- ')}`);
  }

  return;
}

// Comando para adicionar nova palavra proibida
if (message.startsWith('.addpalavra ') && chat.isGroup) {
    const participante = chat.participants.find(p => p.id._serialized === senderId);
    if (!participante?.isAdmin) {
        await msg.reply('❌ Apenas administradores podem usar este comando.');
        return;
    }

    const novaPalavra = message.split(' ')[1]?.toLowerCase()?.trim();

    if (!novaPalavra) {
        await msg.reply('❌ Use o comando assim:\n.addpalavra <palavra>');
        return;
    }

    const groupId = msg.from; // 💡 Corrige o erro de variável indefinida

    if (!palavrasProibidas[groupId]) {
        palavrasProibidas[groupId] = { ativo: true, lista: [] };
    }

    if (!palavrasProibidas[groupId].lista.includes(novaPalavra)) {
        palavrasProibidas[groupId].lista.push(novaPalavra);
        await msg.reply(`✅ Palavra "${novaPalavra}" adicionada à lista proibida.`);

        // 💾 Salvar tudo corretamente
        salvarPalavrasProibidas(palavrasProibidas);
    } else {
        await msg.reply(`⚠️ A palavra "${novaPalavra}" já está na lista.`);
    }

    return;
}

// Comando .desbloquearpalavra <palavra>
if (msg.body.startsWith('.desbloquearpalavra ') && msg.from.includes('@g.us')) {
    const palavra = msg.body.split(' ')[1]?.toLowerCase();
    if (!palavra) return msg.reply('❌ Escreva uma palavra após o comando.');

    if (palavrasProibidas[msg.from]?.includes(palavra)) {
        palavrasProibidas[msg.from] = palavrasProibidas[msg.from].filter(p => p !== palavra);
        salvarPalavrasProibidas();

        msg.reply(`✅ Palavra "${palavra}" foi desbloqueada.`);
    } else {
        msg.reply(`⚠️ A palavra "${palavra}" não está na lista.`);
    }
}

// Ativar anticoncorrência
if (msg.body === '.anticoncorrencia on' && msg.from.endsWith('@g.us')) {
   if (!isGroupAdmin && !isDono) {
        await msg.reply('❌ Apenas administradores ou o dono do bot podem usar este comando.');
        return;
    }


    toggleAnticoncorrencia(msg.from, true);
    msg.reply('🛡️ Anticoncorrência ativada neste grupo!');
    return;
}

// Desativar anticoncorrência
if (msg.body === '.anticoncorrencia off' && msg.from.endsWith('@g.us')) {
   if (!isGroupAdmin && !isDono) {
        await msg.reply('❌ Apenas administradores ou o dono do bot podem usar este comando.');
        return;
    }


    toggleAnticoncorrencia(msg.from, false);
    msg.reply('⚠️ Anticoncorrência desativada neste grupo.');
    return;
}

  // Ativar/Desativar antilink
    if (message === '.antilink on' && chat.isGroup) {
 const participante = chat.participants.find(p => p.id._serialized === senderId);
    if (!participante?.isAdmin) {
        await msg.reply('❌ Apenas administradores podem usar este comando.');
        return;
    }
          antilinkData[groupId] = true;
            writeAntilink(antilinkData);
            await msg.reply('✅ Antilink ativado neste grupo.');
            return;
        }

        if (message === '.antilink off' && chat.isGroup) {
            antilinkData[groupId] = false;
            writeAntilink(antilinkData);
            await msg.reply('❌ Antilink desativado neste grupo.');
            return;
        }
      
        // Verificar links se estiver ativado
        if (antilinkData[groupId]) {
            if ((message.includes("http://") || message.includes("https://")) && chat.isGroup) {
                const senderIdMsg = contact.id._serialized;

                const botNumber = client.info.wid._serialized;
                const botIsAdmin = chat.participants.some(p => p.id._serialized === botNumber && p.isAdmin);
                const senderIsAdmin = chat.participants.some(p => p.id._serialized === senderIdMsg && p.isAdmin);

                if (!senderIsAdmin && botIsAdmin) {
                    await msg.delete(true);
                    await chat.sendMessage(`🚫 @${contact.number}, links não são permitidos. Você será removido!`, {
                        mentions: [contact]
                    });
                }
            }
        }

        // Comando .todos para mencionar todo mundo (admin apenas)
        if (message.startsWith('.todos') && chat.isGroup) {
            const participante = chat.participants.find(p => p.id._serialized === senderId);
            if (!participante?.isAdmin) {
                await msg.reply('❌ Apenas administradores podem usar este comando.');
                return;
            }

            const texto = msg.body.slice(6).trim() || '📢 Atenção a todos!';
            let mentions = [];

            for (let p of chat.participants) {
                const contactMent = await client.getContactById(p.id._serialized);
                mentions.push(contactMent);
            }

            await msg.delete(true); // apaga a mensagem original
            await chat.sendMessage(texto, { mentions });
            return;
        }

        // Verificar validade do plano do grupo
        if (msg.isGroupMsg) {
            const grupoId = msg.from;
            const validade = planos[grupoId];
            if (!validade || new Date() > new Date(validade)) {
                await msg.reply('❌ Seu plano expirou. Por favor, renove seu plano com o gestor do bot.');
                return;
            }
        }
        // Comando .id - mostrar ID 
        if (message.toLowerCase() === '.id' && chat.isGroup) {
        if (!participante?.isAdmin) {
                await msg.reply('❌ Apenas administradores podem usar este comando.');
                return;
            }

  const grupoId = msg.from; 
  await msg.reply(`🆔 *ID do grupo:* ${grupoId}`);
}

    // Comando .bot -  mostra dias que faltam
if (message.toLowerCase() === '.bot' && chat.isGroup) {
    if (!isGroupAdmin && !isDono) {
        await msg.reply('❌ Apenas administradores ou o dono do bot podem usar este comando.');
        return;
    }

    const planos = readPlanos();
    const grupoId = msg.from;
    const plano = planos[grupoId];

    if (!plano) {
        await msg.reply('❌ Este grupo não possui um plano ativo.');
        return;
    }

    const validade = new Date(plano.validade);
    const agora = new Date();
    const tempoRestante = validade - agora;

    if (tempoRestante <= 0) {
        await msg.reply('❌ O plano deste grupo já expirou.');
        return;
    }

    const segundos = Math.floor((tempoRestante / 1000) % 60);
const minutos = Math.floor((tempoRestante / (1000 * 60)) % 60);
const horas = Math.floor((tempoRestante / (1000 * 60 * 60)) % 24);
const dias = Math.floor(tempoRestante / (1000 * 60 * 60 * 24));

await msg.reply(`📅 *Plano ativo!*
⏳ Tempo restante: *${dias}d ${horas}h ${minutos}min ${segundos}s*`);
}


    // Comando .alugar - adiciona dias para grupo (apenas dono)
     if (message.toLowerCase().startsWith('.alugar')) {
    if (!isDono) {
        await msg.reply('❌ Apenas o dono do bot pode usar esse comando.');
        return;
    }

    const params = message.slice(7).trim(); // tudo depois de ".alugar"
    const partes = params.split(',');
    if (partes.length < 2) {
        await msg.reply('❌ Use corretamente:\n.alugar ID_DO_GRUPO,7');
        return;
    }

    const grupoId = partes[0].trim();
    const diasInt = parseInt(partes[1].trim());

    if (!grupoId || isNaN(diasInt)) {
        await msg.reply('❌ Use corretamente:\n.alugar ID_DO_GRUPO,7');
        return;
    }

    const planos = readPlanos();
    const validade = new Date();
    validade.setDate(validade.getDate() + diasInt);
    planos[grupoId] = { validade: validade.toISOString() };
    writePlanos(planos);

    await msg.reply(`✅ Grupo *${grupoId}* ativado por *${diasInt}* dias!`);
}

// Comando .clientes — mostra lista de clientes do grupo atual
if (message === '.clientes') {
   if (!isGroupAdmin && !isDono) {
        await msg.reply('❌ Apenas administradores ou o dono do bot podem usar este comando.');
        return;
    }


    const compras = readJsonSafe('compras.json');
    const grupoID = msg.from;

    if (!compras || !compras[grupoID]) {
        client.sendMessage(grupoID, '❌ Nenhuma compra registrada ainda neste grupo.');
        return;
    }

    const dadosMB = {};
    const dadosSaldo = {};

    for (const numero in compras[grupoID]) {
        const registros = compras[grupoID][numero].compras || [];

        const numeroLimpo = numero.replace(/\D/g, ''); // Limpa o número

        registros.forEach(compra => {
            const tipo = compra.tipo || (compra.quantidade.toString().includes('saldo') ? 'saldo' : 'mb');
            const quant = parseInt(compra.quantidade.toString().replace(/\D/g, ''));

            const base = tipo === 'saldo' ? dadosSaldo : dadosMB;

            if (!base[numeroLimpo]) {
                base[numeroLimpo] = {
                    total: 0,
                    quantidadeCompras: 0
                };
            }

            base[numeroLimpo].total += quant;
            base[numeroLimpo].quantidadeCompras += 1;
        });
    }

    function gerarRanking(dados, tipo) {
        const ordenado = Object.entries(dados).sort((a, b) => b[1].total - a[1].total);
        if (ordenado.length === 0) return 'Nenhum cliente ainda.';

        return ordenado.map(([numero, info], i) => {
            const nomeExibido = `@${numero}`;
            if (tipo === 'mb') {
                const gb = (info.total / 1024).toFixed(2);
                const tb = (info.total / (1024 * 1024)).toFixed(2);
                return `${i + 1}) ${nomeExibido}\n   • ${info.total}MB\n   • Convertido: ${gb}GB, ${tb}TB\n   • Total de compras: ${info.quantidadeCompras}`;
            } else {
                return `${i + 1}) ${nomeExibido}\n   • ${info.total} saldo\n   • Total de compras: ${info.quantidadeCompras}`;
            }
        }).join('\n\n');
    }

    const resposta = `🛒 *Lista de Clientes - Ranking por Produto (Grupo Atual):*\n\n` +
        `📊 *Ranking de Clientes que compraram saldo:*\n\n${gerarRanking(dadosSaldo, 'saldo')}\n\n` +
        `📊 *Ranking de Clientes que compraram MB:*\n\n${gerarRanking(dadosMB, 'mb')}`;

    client.sendMessage(grupoID, resposta, {
        mentions: Object.keys(dadosMB).concat(Object.keys(dadosSaldo)).map(n => `${n}@c.us`)
    });
}

// Ativar palavrão
if (message === '.palavra on' && chat.isGroup) {
  const participante = chat.participants.find(p => p.id._serialized === senderId);
  if (!participante?.isAdmin) {
    await msg.reply('❌ Apenas administradores podem ativar o sistema.');
    return;
  }

  palavrasProibidas[groupId] = palavrasProibidas[groupId] || { ativo: false, lista: [] };
  palavrasProibidas[groupId].ativo = true;
  salvarPalavrasProibidas();
  await msg.reply('🟢 Sistema de palavras proibidas ativado.');
  return;
}

if (message === '.palavra off' && chat.isGroup) {
  palavrasProibidas[groupId] = palavrasProibidas[groupId] || { ativo: false, lista: [] };
  palavrasProibidas[groupId].ativo = false;
  salvarPalavrasProibidas();
  await msg.reply('🔴 Sistema de palavras proibidas desativado.');
  return;
}

// ✅ Verifica se está no modo de edição de palavras proibidas para o grupo
if (modoEdicaoPalavras[groupId]) {
    // Se a mensagem for ".fim", encerra o modo de edição
    if (message.toLowerCase() === '.fim') {
        modoEdicaoPalavras[groupId] = false;       // Desativa modo de edição
        salvarPalavrasProibidas();                  // Salva arquivo de palavras proibidas
        await msg.reply('✅ Lista de palavras proibidas atualizada com sucesso.');
    } else {
        // Se ainda não existir a estrutura para o grupo, cria com formato correto
        if (!palavrasProibidas[groupId]) {
            palavrasProibidas[groupId] = { ativo: false, lista: [] };
        }

        // Adiciona a palavra à lista de palavras proibidas do grupo
        palavrasProibidas[groupId].lista.push(message.trim().toLowerCase());

        await msg.reply(`➕ Palavra adicionada: *${message.trim()}*`);
    }
    return; 
}
// Iniciar modo de edição
 if (modoEdicaoPalavras[groupId]) {
  if (message.toLowerCase() === '.fim') {
    modoEdicaoPalavras[groupId] = false;
    salvarPalavrasProibidas();
    await msg.reply('✅ Lista de palavras proibidas atualizada com sucesso.');
  } else {
    if (!palavrasProibidas[groupId]) {
      palavrasProibidas[groupId] = { ativo: false, lista: [] };
    }
    palavrasProibidas[groupId].lista.push(message.trim().toLowerCase());
    await msg.reply(`➕ Palavra adicionada: *${message.trim()}*`);
  }
  return;
}

if (message === '.editar palavras' && chat.isGroup) {
  const participante = chat.participants.find(p => p.id._serialized === senderId);
  if (!participante?.isAdmin) {
    await msg.reply('❌ Apenas administradores podem usar este comando.');
    return;
  }

  modoEdicaoPalavras[groupId] = true;
  if (
  !palavrasProibidas[groupId] ||
  typeof palavrasProibidas[groupId] !== 'object' ||
  !Array.isArray(palavrasProibidas[groupId].lista)
) {
  palavrasProibidas[groupId] = { ativo: false, lista: [] };
}
  await msg.reply('✏️ Envie as palavras proibidas (uma por mensagem). Digite *.fim* para encerrar.');
  return;
}

// mensagens recebidas
if (chat.isGroup && palavrasProibidas[groupId]?.ativo) {
  const lista = palavrasProibidas[groupId].lista || [];
  const conteudo = message.toLowerCase();
  const encontrou = lista.some(p => conteudo.includes(p));

  if (encontrou) {
    const participante = chat.participants.find(p => p.id._serialized === senderId);
    if (!participante?.isAdmin) {
      try {
        await msg.delete(true); // apaga a mensagem com palavra proibida

        const contato = await client.getContactById(userId);
        await client.sendMessage(groupId, `⚠️ @${contato.id.user}, sua mensagem foi apagada por conter palavras proibidas.`, {
          mentions: [contato]
        });
      } catch (e) {
        console.log('Erro ao apagar mensagem ou avisar:', e.message);
      }
    } else {
      await msg.reply('⚠️ Palavra proibida detectada, mas você é admin.');
    }
  }
}
 
   // Comando .limpar (apenas admin)
        if (message === '.limpar' && chat.isGroup) {
            const participante = chat.participants.find(p => p.id._serialized === senderId);
            if (!participante?.isAdmin) {
                await msg.reply('❌ Apenas administradores podem usar este comando.');
                return;
            }

            const messages = await chat.fetchMessages({});
            for (let m of messages) {
                try { await m.delete(true); } catch { }
            }

              // Mensagem com muitos espaçamentos + personalizado
    const textoFinal = ` 🤖 
💨💨































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































❲❗❳ Lɪᴍᴘᴇᴢᴀ ᴅᴇ Cʜᴀᴛ Cᴏɴᴄʟᴜɪ́ᴅᴀ ✅`;

    await chat.sendMessage(textoFinal);
    return;
}

 // Comando .aluguelinfo - Relatório de planos por grupo
if (message === '.aluguelinfo' && senderId === '258853155736@c.us') {
    const planos = readJsonSafe('planos.json', {}); 
    const grupoInfo = await client.getChats(); 

    let totalGrupos = 0;
    let planosAtivos = [];
    let planosExpirados = [];
    let semPlano = [];

    for (let chat of grupoInfo) {
        if (!chat.isGroup) continue;

        totalGrupos++;

        const grupoId = chat.id._serialized;
        const plano = planos[grupoId];
        const nomeGrupo = chat.name;

        if (plano && plano.validade) {
            const diasRestantes = Math.floor((new Date(plano.validade) - new Date()) / (1000 * 60 * 60 * 24));
            if (diasRestantes >= 0) {
                planosAtivos.push({ nomeGrupo, grupoId, diasRestantes });
            } else {
                planosExpirados.push({ nomeGrupo, grupoId });
            }
        } else {
            semPlano.push({ nomeGrupo, grupoId });
        }
    }

    const diasServidor = Math.floor((new Date(planos.servidorValidade || 0) - new Date()) / (1000 * 60 * 60 * 24));

    let resposta = `🤖 📊 *Resumo de Grupos*  
• Total de grupos: *${totalGrupos}*  
• Planos ativos: *${planosAtivos.length}*  
• Planos expirados: *${planosExpirados.length}*  
• Dias no plano do servidor: *${diasServidor >= 0 ? diasServidor : 0}*  

🔓 *Grupos com Plano Ativo (${planosAtivos.length}):*\n`;

    planosAtivos.slice(0, 100).forEach((g, i) => {
        resposta += `\n${i + 1}. *${g.nomeGrupo}* (ID: ${g.grupoId})\n   📅 Dias restantes: ${g.diasRestantes}`;
    });

    resposta += `\n\n⚠️ *Grupos com Plano Expirado (${planosExpirados.length}):*\n`;
    if (planosExpirados.length === 0) {
        resposta += `\n❌ Nenhum grupo com plano expirado.\n`;
    } else {
        planosExpirados.slice(0, 100).forEach((g, i) => {
            resposta += `\n${i + 1}. *${g.nomeGrupo}* (ID: ${g.grupoId})`;
        });
    }

    resposta += `\n\n❌ *Grupos sem Plano (${semPlano.length}):*\n`;
    semPlano.slice(0, 100).forEach((g, i) => {
        resposta += `\n${i + 1}. *${g.nomeGrupo}* (ID: ${g.grupoId})`;
    });

    await msg.reply(resposta.slice(0, 4096)); 
}





// Comando .rentanas - mostrar grupos com plano ativo mas sem compras
if (message === '.rentanas' && chat.isGroup) {
 if (!participante?.isAdmin) {
                await msg.reply('❌ Apenas administradores podem usar este comando.');
                return;
            }

    const comprasData = readJsonSafe('compras.json');
    const grupoId = chat.id._serialized;
    const grupoCompras = comprasData[grupoId] || {};

    const semCompras = [];
    const mentions = [];

    for (const participante of chat.participants) {
        const numero = participante.id._serialized;

        // Verifica se o membro NÃO tem nenhuma compra
        if (!grupoCompras[numero] || grupoCompras[numero].total === 0) {
            try {
                const contato = await client.getContactById(numero);
                semCompras.push(`- @${numero.replace('@c.us', '')}`);
                mentions.push(contato); // salva para menção real
            } catch (e) {
                semCompras.push(`- @${numero.replace('@c.us', '')}`);
            }
        }
    }

    if (semCompras.length === 0) {
        await msg.reply('✅ Todos os membros do grupo têm compras registradas.');
    } else {
        const resposta = `⚠️ *Membros sem compras registradas:* ⚠️\n\n${semCompras.join('\n')}`;
        await chat.sendMessage(resposta, { mentions });
    }
}
// Comando .picos – análise de dados de compra (apenas admin)
if (message.toLowerCase() === '.picos') {
    const participante = chat.participants.find(p => p.id._serialized === senderId);
    if (!participante?.isAdmin) {
        await msg.reply('❌ Apenas administradores podem usar este comando.');
        return;
    }

    const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    const contagemDias = {};
    const contagemHoras = {};
    const hoje = new Date();

    // Formatar data no formato dd/mm/yyyy para comparar com c.data
    const hojeFormatado = hoje.toLocaleDateString('pt-PT'); // ex: "07/08/2025"

    let totalHoje = 0;
    let clientesHoje = new Set();
    let rankingHoje = {};

    for (const grupoId in comprasData) {
        for (const numero in comprasData[grupoId]) {
            const comprador = comprasData[grupoId][numero];
            if (comprador.compras) {
                comprador.compras.forEach(c => {
                    const [dia, mes, ano] = c.data.split('/');
                    // Corrige a criação da data para evitar erros no fuso e formato
                    const dataCompra = new Date(parseInt(ano), parseInt(mes) -1, parseInt(dia));
                    const diaNome = diasSemana[dataCompra.getDay()];
                    contagemDias[diaNome] = (contagemDias[diaNome] || 0) + 1;

                    if (c.data === hojeFormatado) {
                        totalHoje += c.quantidade;
                        clientesHoje.add(numero);
                        rankingHoje[numero] = (rankingHoje[numero] || 0) + c.quantidade;
                    }
                });
            }

            if (comprador.lastCompra) {
                const hora = new Date(comprador.lastCompra).getHours();
                if (hora >= 6 && hora <= 23) {
                    contagemHoras[hora] = (contagemHoras[hora] || 0) + 1;
                }
            }
        }
    }

    const topDias = Object.entries(contagemDias)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([dia, qtd]) => `• ${dia}: ${qtd} compras`);

    const menosDia = Object.entries(contagemDias).length > 0
        ? Object.entries(contagemDias).sort((a, b) => a[1] - b[1])[0]
        : null;

    const topHoras = Object.entries(contagemHoras)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([h, qtd]) => `• ${h}h: ${qtd} compras`);

    const horasMortas = Object.entries(contagemHoras)
        .sort((a, b) => a[1] - b[1])
        .slice(0, 3)
        .map(([h, qtd]) => `• ${h}h: ${qtd} compras`);

    const topComprador = Object.entries(rankingHoje).length > 0
        ? Object.entries(rankingHoje).sort((a, b) => b[1] - a[1])[0]
        : null;

    const resposta = `📊 *Análise de Picos de Compra*\n\n🗓️ *Top 3 dias com mais compras:*\n${topDias.join('\n')}

📉 *Dia com menos compras:*\n${menosDia ? `• ${menosDia[0]}: ${menosDia[1]} compras` : 'Nenhuma compra registrada.'}

⏰ *Top 3 horários com mais compras:*\n${topHoras.join('\n')}

💤 *Top 3 horários mais calmos (06h–23h):*\n${horasMortas.join('\n')}

📦 *Total vendido hoje:* ${(totalHoje / 1024).toFixed(2)} GB

👥 *Clientes únicos hoje:* ${clientesHoje.size}

👑 *Top comprador do dia:*\n${topComprador ? `• ${topComprador[0]} com ${(topComprador[1] / 1024).toFixed(2)} GB` : 'Ninguém comprou hoje.'}`;

    await msg.reply(resposta);
    return;
}

        // Grupo fechar/abrir
        if ((message === '.grupo f' || message === '.grupo a') && chat.isGroup) {
            const participante = chat.participants.find(p => p.id._serialized === senderId);
            if (!participante?.isAdmin) {
                await msg.reply('❌ Apenas admins podem usar esse comando.');
                return;
            }
            const fechar = message === '.grupo f';
            await chat.setMessagesAdminsOnly(fechar);
            await chat.sendMessage(fechar ? '🔒 Grupo fechado' : '🔓 Grupo aberto ');
            return;
        }

    
    // Nanoadd - comandos personalizados por grupo
if (message.toLowerCase().startsWith('.nanoadd')) {
    if (!msg.from.includes('@g.us') || !chat.participants) {
        await msg.reply('❌ Este comando só pode ser usado em grupos.');
        return;
    }

    const participante = chat.participants.find(p => p.id._serialized === senderId);
    if (!participante?.isAdmin) {
        await msg.reply('❌ Apenas administradores podem usar este comando.');
        return;
    }

    const entrada = message.slice(9).trim();
    const separadorIndex = entrada.indexOf(',');

    if (separadorIndex === -1) {
        await msg.reply('❗ Formato inválido. Use: .nanoadd chave, resposta');
        return;
    }

    const chave = entrada.slice(0, separadorIndex).trim().toLowerCase();
    const resposta = entrada.slice(separadorIndex + 1).trim();

    if (!chave || !resposta) {
        await msg.reply('❗ Formato inválido. Use: .nanoadd chave, resposta');
        return;
    }

    const grupoId = msg.from;

    if (!comandos.gerais[grupoId]) comandos.gerais[grupoId] = {};
    comandos.gerais[grupoId][chave] = resposta;

    if (!comandosAtivos[grupoId]) comandosAtivos[grupoId] = {};
    comandosAtivos[grupoId][chave] = resposta;

    writeJsonSafe(COMANDOS_PATH, comandos);
    await msg.reply(`✅ Gatilho *${chave}* adicionado com sucesso apenas neste grupo!`);
    return;
}

// Verificação de comandos ativos por grupo
if (msg.from.endsWith('@g.us')) {
    const grupoId = msg.from;
    const comandosGrupo = comandosAtivos[grupoId];

    if (comandosGrupo) {
        for (const chave in comandosGrupo) {
            if (
                typeof msg.body === 'string' &&
                msg.body.toLowerCase().includes(chave.toLowerCase())
            ) {
                await msg.reply(comandosGrupo[chave]);
                return;
            }
        }
    }
}

  // Editar revendedor/fornecedor (modo edição)
        if ((message.toLowerCase() === '.editar revendedor' || message.toLowerCase() === '.editar fornecedor') && chat.isGroup) {
            const participante = chat.participants.find(p => p.id._serialized === senderId);
            if (!participante?.isAdmin) {
                await msg.reply('❌ Apenas administradores podem usar este comando.');
                return;
            }

            modoEdicaoAtivo = true;
            categoriaEdicao = message.toLowerCase().includes('revendedor') ? 'revendedor' : 'fornecedor';
            await msg.reply(`✏️ Modo edição ${categoriaEdicao.toUpperCase()} ativado! Envie comandos no formato: gatilho resposta\nEnvie .fim para finalizar.`);
            return;
        }

        // Ativar revendedor/fornecedor
        if ((message.toLowerCase() === '.ativar revendedor' || message.toLowerCase() === '.ativar fornecedor') && chat.isGroup) {
            if (senderId !== '258853155736@c.us') {
    await msg.reply('❌ Apenas o dono do bot pode usar esse comando.');
    return;
  }
            comandosAtivos = {
                ...comandos.gerais,
                ...(message.includes('revendedor') ? comandos.revendedor : comandos.fornecedor)
            };
            await msg.reply(`✅ Comandos de ${message.includes('revendedor') ? 'revendedor' : 'fornecedor'} ativados!`);
            return;
        }


     // Compras on (ativar sistema compras)
if (message.toLowerCase().startsWith('.compras on') && chat.isGroup) {
    const participante = chat.participants.find(p => p.id._serialized === senderId);
    if (!participante?.isAdmin) {
        await msg.reply('❌ Apenas administradores podem usar este comando.');
        return;
    }

    const params = message.split(',');
    if (params.length < 2) {
        await msg.reply('❗ Use: .compras on,mb,saldo');
        return;
    }

    const tipos = params.slice(1).map(t => t.trim().toLowerCase());
    sistemaComprasAtivo[chatId] = { ativo: true, tipos };

    // SALVANDO no arquivo compras.json com o caminho correto
    fs.writeFileSync(COMPRAS_PATH, JSON.stringify(sistemaComprasAtivo, null, 2));

    await msg.reply(`✅ Sistema de compras ativado para: ${tipos.join(', ')}`);
    return;
}

      // Registro de compras
         if (message.toLowerCase().startsWith('.compra')) {
    if (!sistemaComprasAtivo[chatId]?.ativo) {
        await msg.reply('❗ Sistema de compras não está ativo neste grupo.');
        return;
    }

    let text = message.replace('.compra', '').trim();     
    const partes = text.split(',');
    if (partes.length < 2) {
        await msg.reply('❗ Formato inválido. Use: .compra quantidade{mb|gb|saldo}, número');
        return;
    }

    const compraRaw = partes[0].trim().toLowerCase();
    const numero = partes[1].trim();

    const match = compraRaw.match(/^(\d+)(mb|gb|saldo)$/);
    if (!match) {
        await msg.reply('❗ Quantidade inválida. Use: número seguido de mb, gb ou saldo. Ex: 10240mb ou 10gb');
        return;
    }

    let quantidade = parseInt(match[1]);
    let tipo = match[2];

    if (tipo === 'gb') {
        quantidade = quantidade * 1024; // Converte GB para MB
        tipo = 'mb'; // Trata internamente como 'mb'
    }

    if (!sistemaComprasAtivo[chatId].tipos.includes(tipo)) {
        await msg.reply(`❗ Tipo de compra "${tipo}" não está ativado neste grupo.`);
        return;
    }

    if (!comprasData[chatId]) comprasData[chatId] = {};
    if (!comprasData[chatId][numero]) comprasData[chatId][numero] = {};

    if (!comprasData[chatId][numero][tipo]) {
        comprasData[chatId][numero][tipo] = {
            total: 0,
            comprasHoje: 0,
            lastCompra: 0,
            compras: []
        };
    }

    const compraUser = comprasData[chatId][numero][tipo];
    const numeroLimpo = numero.replace(/\D/g, ''); // remove caracteres não numéricos
    compraUser.total += quantidade;
    const hojeStr = formatDate(new Date());

    if (compraUser.compras.length > 0 && compraUser.compras[compraUser.compras.length - 1].data === hojeStr) {
        compraUser.compras[compraUser.compras.length - 1].quantidade += quantidade;
        compraUser.comprasHoje += 1;
    } else {
        compraUser.compras.push({ data: hojeStr, quantidade });
        compraUser.comprasHoje = 1;
    }

    compraUser.lastCompra = Date.now();
    writeJsonSafe(COMPRAS_PATH, comprasData);

    const grupoCompras = comprasData[chatId];
    const compradoresOrdenados = Object.entries(grupoCompras)
        .filter(([_, dados]) => dados[tipo])
        .sort((a, b) => b[1][tipo].total - a[1][tipo].total);

    const posicao = compradoresOrdenados.findIndex(([num]) => num === numero) + 1;
    const maiorCompra = compradoresOrdenados.length > 0 ? compradoresOrdenados[0][1][tipo].total : quantidade;
    const dias = diasDesde(compraUser.lastCompra);

    let mensagemResposta = `Obrigado @${numero} por comprar *${quantidade}${tipo.toUpperCase()}*!\n`;

    if (compraUser.comprasHoje === 1) {
        mensagemResposta += `Você está fazendo a sua primeira compra do dia!\n`;
        if (dias !== null && dias > 0) {
            mensagemResposta += `Há ${dias} dias que você não comprava. Bom tê-lo(a) de volta!\n\n`;
        } else {
            mensagemResposta += `\n`;
        }
    } else {
        mensagemResposta += `Você já fez ${compraUser.comprasHoje} compras hoje.\n\n`;
    }

    mensagemResposta += `Você é o comprador nº ${posicao} do grupo, com um total acumulado de ${compraUser.total}${tipo.toUpperCase()}.\n`;
    mensagemResposta += `O maior comprador acumulou ${maiorCompra}${tipo.toUpperCase()}.\n`;
    mensagemResposta += `Lute para ultrapassar esse nível e ganhar bônus incríveis!`;

    await chat.sendMessage(mensagemResposta, { mentions: [contact] });
    return;
writeJsonSafe('./compras.json', comprasData);

}
  
    } catch (error) {
        console.error('Erro no listener de mensagens:', error);
    }
});

client.on('group_join', async (notification) => {
  try {
    const chat = await notification.getChat();

    // ID do novo participante (ex: 25884xxxxxxx@c.us)
    const participantId = notification.id?.participant;
    if (!participantId) {
      console.warn('ID do participante não encontrado na notificação');
      return;
    }

    // Pega o contato completo da pessoa que entrou
    let participantContact;
    try {
      participantContact = await client.getContactById(participantId);
    } catch (err) {
      console.error('Erro ao buscar contato do participante:', err);
      return;
    }

    // Extrai o número no formato +25884xxxxxxx
    const numeroComDDI = `+${participantId.replace('@c.us', '')}`;

    // Formata para mostrar com @ no texto (isso é só visual)
    const userTag = `@${participantId.replace('@c.us', '')}`;

    const mensagem = `
boas-vindas Olá ${userTag} 🇲🇿, tas pronto para fazer sua compra?

*Digite ja⤵️*

📖 \`Tabela\` para veres a tabela do nosso lindo grupo.

💳 \`Pagamentos\` para veres as formas de pagamento do nosso querido administrador 

Caso tenhas duvidas digite⤵️

⚙️ \`.ajuda\` Para seres ajudado🙂

Não tenha vergonha patrão ${userTag} 🇲🇿 ❤‍🩹
    `.trim();

    // Envia a mensagem mencionando a pessoa de verdade
    await chat.sendMessage(mensagem, {
      mentions: [participantContact] // menção real (clicável)
    });

  } catch (error) {
    console.error('Erro ao enviar mensagem de boas-vindas:', error);
  }
});

client.on('message_create', async (msg) => {
  try {
    const chat = await msg.getChat();
    const sender = await msg.getContact();
    const isGroup = chat.isGroup;
    const isAdm = chat.participants.find(p => p.id._serialized === sender.id._serialized && p.isAdmin);

    if (!isGroup) return;

    const body = msg.body.trim();

    // Aceita .ban com número ou reply marcando a mensagem da pessoa
    if (body.toLowerCase().startsWith('.ban')) {
      if (!isAdm) return msg.reply("❌ Apenas administradores podem usar este comando.");

      let targetId;

      // Se for reply, pega o autor da mensagem marcada
      if (msg.hasQuotedMsg) {
        const quotedMsg = await msg.getQuotedMessage();
        targetId = quotedMsg.author || quotedMsg.from; // autor da mensagem marcada
      } else {
        // Se não for reply, pega o número do comando
        const parts = body.split(' ');
        if (parts.length < 2) return msg.reply("❌ Use: .ban 258841234567 ou responda a mensagem da pessoa com .ban");

        let number = parts[1].replace(/\D/g, '');
        if (!number.startsWith('258')) number = '258' + number;
        targetId = number + '@c.us';
      }

      try {
        console.log(`Tentando remover: ${targetId}`);
        await chat.removeParticipants([targetId]);
        await chat.sendMessage(`✅ Usuário removido com sucesso!`);
      } catch (error) {
        // Ignora erro específico do Puppeteer relacionado ao "expected at least 1 children"
        if (!error.message.includes('expected at least 1 children')) {
          console.error('Erro no comando .ban:', error);
          await msg.reply("⚠️ Erro ao tentar remover o usuário.");
        }
      }
    }
  } catch (err) {
    console.error('Erro geral no comando .ban:', err);
  }
});

client.on('message_create', async (msg) => {
  const chat = await msg.getChat();
  const groupId = msg.from;
  const userId = msg.author || msg.from;

  // Só age em grupos
  if (!msg.from.endsWith('@g.us')) return;

  // Verifica se o Antilink está ativado
  if (!config.grupos[groupId] || !config.grupos[groupId].antilink) return;

  // Regex detecta links
  const linkRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|chat\.whatsapp\.com\/[A-Za-z0-9]+)/gi;
  const match = msg.body.toLowerCase().match(linkRegex);

  if (match && !msg.fromMe) {
    const participants = await chat.participants;
    const userIsAdmin = participants.find(p => p.id._serialized === userId && p.isAdmin);

    if (userIsAdmin) return; // Ignora admins

    try {
      // Apaga a mensagem do grupo (se possível)
      await chat.deleteMessage(msg.id, false); // false = apagar para todos

      // Remove o participante
      await chat.removeParticipants([userId]);

      const contato = await client.getContactById(userId);
      await client.sendMessage(groupId, `🚫 @${contato.id.user} foi removido por enviar links.`, {
        mentions: [contato]
      });
    } catch (err) {
      console.error('Erro ao apagar/remover:', err);
    }
  }
});

client.on('message_create', async (msg) => {
  try {
    const chat = await msg.getChat();
    if (!chat.isGroup) return;

    const groupId = msg.from;
    const userId = msg.author || msg.from;
    const nomeAutor = msg._data.notifyName || 'Usuário';
    const texto = msg.body?.toLowerCase() || '';

    // Verifica se sistema de palavras está ativo
    if (!palavrasProibidas[groupId]?.ativo) return;

    const lista = palavrasProibidas[groupId].lista || [];
    const encontrouPalavra = lista.some(p => texto.includes(p));
    if (!encontrouPalavra) return;

    const participante = chat.participants.find(p => p.id._serialized === userId);
    const isAdmin = participante?.isAdmin || false;

    // Inicializa o contador de infrações
    const agora = Date.now();
    if (!contadoresAntifraude[groupId]) contadoresAntifraude[groupId] = {};
    if (!contadoresAntifraude[groupId][userId]) {
      contadoresAntifraude[groupId][userId] = { count: 0, lastReset: agora };
    } else {
      const ultimaSemana = contadoresAntifraude[groupId][userId].lastReset;
      const umaSemana = 7 * 24 * 60 * 60 * 1000;
      if (agora - ultimaSemana > umaSemana) {
        contadoresAntifraude[groupId][userId].count = 0;
        contadoresAntifraude[groupId][userId].lastReset = agora;
      }
    }

    const userData = contadoresAntifraude[groupId][userId];

    if (!isAdmin) {
      await msg.delete(true);

      const contato = await client.getContactById(userId);

      userData.count++;

      if (userData.count === 1) {
        await client.sendMessage(groupId, `⚠️ @${contato.id.user}, você usou uma palavra proibida. Evite repetir para não ser removido.`, {
          mentions: [contato]
        });
      } else if (userData.count === 2) {
        await client.sendMessage(groupId, `⚠️ @${contato.id.user}, esta é sua segunda infração. Na próxima será removido.`, {
          mentions: [contato]
        });
      } else if (userData.count >= 3) {
        await client.sendMessage(groupId, `❌ @${contato.id.user} foi removido por repetir palavras proibidas.`, {
          mentions: [contato]
        });
        await chat.removeParticipants([userId]);
        userData.count = 3; // trava em 3
      }
    } else {
      await msg.reply('⚠️ Palavra proibida detectada, mas você é admin.');
    }

  } catch (e) {
    console.error('❌ Erro no sistema antipalavras:', e.message);
  }
});


client.on('message_create', async (msg) => {
  try {
    if (!msg.from.endsWith('@g.us')) return; // só grupo

    const chat = await msg.getChat();
    const sender = await msg.getContact();

    const participante = chat.participants.find(p => p.id._serialized === sender.id._serialized);
    const isAdmin = participante?.isAdmin || participante?.isSuperAdmin;

 if (msg.body.toLowerCase() === '.audio a') {
  if (!isAdmin) return msg.reply('❌ Apenas administradores podem ativar os áudios.');
  audiosConfig[msg.from] = true;
  fs.writeFileSync('./audioStatus.json', JSON.stringify(audiosConfig, null, 2)); // salva arquivo
  return msg.reply('🔊 Áudios ativados neste grupo.');
}

if (msg.body.toLowerCase() === '.audio f') {
  if (!isAdmin) return msg.reply('❌ Apenas administradores podem desativar os áudios.');
  audiosConfig[msg.from] = false;
  fs.writeFileSync('./audioStatus.json', JSON.stringify(audiosConfig, null, 2)); // salva arquivo
  return msg.reply('🔇 Áudios desativados neste grupo.');
}
    // --- Bloqueia envio de áudios para não-admins se estiver ativado ---
const groupId = msg.from;  // ou outra forma de definir o id do grupo

    if ((msg.type === 'ptt' || msg.type === 'audio') && audiosConfig[groupId]) {
       const userId = msg.author || msg.from;
      const participant = chat.participants.find(p => p.id._serialized === userId);
       const isAdmin = participant?.isAdmin || participant?.isSuperAdmin;

      if (!isAdmin) {
        await msg.delete(true);
        const nomeAutor = msg._data.notifyName || 'Usuário';

        await chat.sendMessage(`🚫 *${nomeAutor}*, o envio de áudios é restrito a administradores neste grupo.`);
        return;
      }
    }

  } catch (err) {
    console.error('Erro ao processar mensagem:', err);
  }
});

// --- Sistema Antilink ---
client.on('message_create', async (msg) => {
  const chat = await msg.getChat();
  const groupId = msg.from;
  const userId = msg.author || msg.from;

  // Só age em grupos
  if (!msg.from.endsWith('@g.us')) return;

  // Regex detecta links
  const linkRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|chat\.whatsapp\.com\/[A-Za-z0-9]+)/gi;
  const match = msg.body.toLowerCase().match(linkRegex);

  // Verifica se tem pelo menos 1 link e se não foi o bot que enviou
  if (match && !msg.fromMe) {
    const participants = await chat.participants;
    const userIsAdmin = participants.find(p => p.id._serialized === userId && p.isAdmin);

    if (userIsAdmin) return; // Ignora admins

    try {
      // Apaga a mensagem com link imediatamente
      await msg.delete(true);

      // Remove o usuário
      await chat.removeParticipants([userId]);

      // Menciona e avisa no grupo
      const contato = await client.getContactById(userId);
      await client.sendMessage(groupId, `🚫 @${contato.id.user} foi removido por enviar links.`, {
        mentions: [contato]
      });
    } catch (err) {
      console.error('Erro ao remover participante:', err);
    }
  }
});


client.initialize();