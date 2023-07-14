export const IMG_ICON_MAP = {
    "Acreditado": "checkbox-circle",
    "Alerta": "alert",
    "Apagar": "close-circle",
    "Aprovado": "checkbox-circle",
    "Arroba": "at",
    "Ascendente": "arrow-up-s",
    "AscendenteS": "arrow-up-s",
    "atalho_administracao.gif": "admin",
    "atalho_computador.gif": "computer",
    "atalho_coracao.gif": "heart",
    "atalho_curso.gif": "honour",
    "atalho_default.gif": "share-forward",
    "atalho_disciplina.gif": "book",
    "atalho_fabrica.gif": "building-3",
    "atalho_grafico.gif": "bar-chart",
    "atalho_instituicao.gif": "bank",
    "atalho_laboratorio.gif": "test-tube",
    "atalho_lampada.gif": "lightbulb",
    "atalho_lupa.gif": "search",
    "atalho_martelo.gif": "hammer",
    "atalho_mundo.gif": "earth",
    "atalho_olho.gif": "eye",
    "atalho_pessoa.gif": "user",
    "atalho_predio.gif": "building-4",
    "atalho_roda_dentada.gif": "settings-4",
    "atalho_smile_admirado.gif": "emotion",
    "atalho_smile_feliz.gif": "emotion-happy",
    "atalho_smile_triste.gif": "emotion-unhappy",
    "atalho_tomada.gif": "plug",
    "BotaoColapsar": "close-circle",
    "BotaoMin": "close-circle",
    "BotaoPersonalisar": "edit",
    "BotaoRestaurar": "add-circle",
    "CERT-Certidao": "file-paper-2",
    "CERT-Visto": "checkbox-circle",
    "Comentario": "edit",
    "Completo": "checkbox-circle",
    "CriarNovo": "add-circle",
    "Descendente": "arrow-down-s",
    "DescendenteS": "arrow-down-s",
    "Documento": "file-text",
    "DocumentoCriar": "file-add",
    "EditarPerfil": "edit",
    "EnderecoEmail": "mail",
    "Erro": "error-warning",
    "EstadoSem1_off": "arrow-up-circle",
    "EstadoSem1": "checkbox-circle",
    "EstadoSem2": "arrow-down-circle",
    "EstadoSem3": "refresh",
    "EstadoSem4": "close-circle",
    "facebook_32.png": "facebook-box",
    "Fazer": "indeterminate-circle",
    "FEST-Selecionado": "radio-button",
    "FEST-Selecionar": "checkbox-blank-circle",
    "GENT-ContactoAguarda": "error-warning",
    "GENT-ContactoOK": "checkbox-circle",
    "GPAG-Documento-Impresso": "printer",
    "GPAG-Documento": "file-text",
    "GPAG-MB": "bank-card-2",
    "In_Logo_Web4Print_CMYK_1in.jpg": "linkedin-box",
    "Informa": "information",
    "Inscrito": "indeterminate-circle",
    "instagram40x40.png": "instagram",
    "IT-AlocAdm": "admin",
    "IT-Email": "mail",
    "IT-Fotos4x4": "layout-grid",
    "IT-Fotos6x6": "grid",
    "LegendaSemaforos": "question",
    "Limpar": "eraser",
    "ListaMais": "add-circle",
    "ListaMenos": "close-circle",
    "LOV": "arrow-left",
    "Lupa": "search",
    "MarcaTemporal": "checkbox-circle",
    "MarcaTemporalActivo": "play-circle",
    "MarcaTemporalOff": "checkbox-blank-circle",
    "Mensagem": "chat-4",
    "MensagemBBom": "emotion-laugh",
    "MensagemBom": "emotion-happy",
    "MensagemFilhos": "question-answer",
    "MensagemMau": "emotion-sad",
    "MensagemMMau": "emotion-unhappy",
    "MensagemNao": "thumb-down",
    "MensagemNeutro": "emotion-normal",
    "MensagemNova": "folder-unknown",
    "MensagemResponder": "edit",
    "MensagemSemFilhos": "chat-off",
    "MensagemSim": "thumb-up",
    "MensagemVelha": "folder",
    "MensagemVelhaV": "folder-open",
    "MenuContextoDetalhesMaisG": "zoom-in",
    "MenuContextoDetalhesMenosG": "zoom-out",
    "MenuContextoEditarG": "edit",
    "MenuContextoImagemPisoDescerOff": "arrow-right-down",
    "MenuContextoImagemPisoSubirOff": "arrow-right-up",
    "MenuContextoInicioG": "",
    "MoodleIcon": undefined,
    "NaoInscrito": "close-circle",
    "Novo": "star",
    "Obr": "asterisk",
    "PaginaWeb": "global",
    "Pasta": "folder-open",
    "PastaFechada": "folder",
    "QuadradoMaisPeq": "add-circle",
    "QuadradoMenosPeq": "close-circle",
    "QuadradoPequenoMais": "add-circle",
    "QuadradoPequenoMenos": "close-circle",
    "ResultadoActual": "map-pin", // TODO (toino): find better icon
    "ResultadoAnt": "arrow-left-s",
    "ResultadoAntFin": "skip-back",
    "ResultadoAntInt": "more",
    "ResultadoSeg": "arrow-right-s",
    "ResultadoSegFin": "skip-forward",
    "ResultadoSegInt": "more",
    "SemAmarelo": "indeterminate-circle",
    "SemPermissoes": "error-warning",
    "SemRegistos": "forbid",
    "SemVerde": "checkbox-circle",
    "SemVermelho": "error-warning",
    "SetaDir": "arrow-right",
    "SUMARIOS-Anexo": "attachment",
    "SUMARIOS-AnexoOff": "attachment",
    "SUMARIOS-VerSumario": "file-text",
    "SUMARIOS-VerSumarioOff": "file-text",
    "Telef": "phone",
    "Visto": "checkbox-circle",
    "youtube_32.png": "youtube",
    "ZipPeq": "file-zip",
} as const satisfies Record<string, string | undefined>;

export const FA_ICON_MAP = {
    "bars": "menu",
    "ellipsis-v": "more-2",
    "envelope-o": "mail",
    "fax": "printer", // TODO (toino): find better icon
    "laptop": "computer",
    "phone": "phone",
    "plus-circle": "add-circle",
    "unlock": "login-circle",
    "envelope": "mail-unread",
} as const satisfies Record<string, string | undefined>;

export const BANNER_ICON_MAP = {
    alerta: "alert",
    info: "information",
} as const satisfies Record<string, string | undefined>;

export const BG_IMAGE_ICON_MAP = {
    ".acao.adicionar-elemento": "add-circle",
    ".acao.adicionar": "add-circle",
    ".acao.eliminar": "close-circle",
    ".acao.limpar": "eraser",
    ".EmAprovacao-28-14": "indeterminate-circle",
    ".terminar-sessao": "logout-circle",
} as const satisfies Record<string, string | undefined>;
