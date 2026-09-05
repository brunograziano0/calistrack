import { Exercise } from "@/types";

// TODO: substitua videoUrl por links reais de demonstracao antes de usar em producao.
// Enquanto videoUrl for null, a interface mostra "Video ainda nao adicionado".

export const EXERCISES_SEED: Exercise[] = [
  { id: "ex-01", slug: "flexao-de-braco", name: "Flexao de braco",
    description: "Exercicio fundamental de empurrar para peito, ombros e triceps.",
    instructions: ["Maos na largura dos ombros, corpo alinhado.", "Desca o peito ate quase tocar o chao.", "Empurre o chao para subir mantendo o core contraido."],
    commonMistakes: ["Quadril caindo", "Cotovelos totalmente abertos"], safetyNotes: "Interrompa se sentir dor no ombro ou punho.",
    primaryMuscles: ["peito", "triceps"], secondaryMuscles: ["ombros", "core"], equipment: ["nenhum"], level: "iniciante", category: "forca",
    videoUrl: null, thumbnailUrl: null, regressionExerciseId: "ex-02", progressionExerciseId: "ex-03", isPublic: true },

  { id: "ex-02", slug: "flexao-inclinada", name: "Flexao inclinada",
    description: "Versao regressiva da flexao, maos elevadas em um banco.",
    instructions: ["Apoie as maos em uma superficie elevada.", "Mantenha o corpo reto.", "Desca controlado e empurre de volta."],
    commonMistakes: ["Superficie instavel"], safetyNotes: "Escolha altura que permita boa forma.",
    primaryMuscles: ["peito", "triceps"], secondaryMuscles: ["ombros"], equipment: ["nenhum"], level: "iniciante", category: "forca",
    videoUrl: null, thumbnailUrl: null, regressionExerciseId: null, progressionExerciseId: "ex-01", isPublic: true },

  { id: "ex-03", slug: "flexao-declinada", name: "Flexao declinada",
    description: "Progressao da flexao com os pes elevados.",
    instructions: ["Pes apoiados em superficie elevada.", "Mantenha o core rigido.", "Execute a amplitude completa."],
    commonMistakes: ["Lombar hiperextendida"], safetyNotes: "Aumente a altura gradualmente.",
    primaryMuscles: ["peito", "ombros"], secondaryMuscles: ["triceps", "core"], equipment: ["nenhum"], level: "intermediario", category: "forca",
    videoUrl: null, thumbnailUrl: null, regressionExerciseId: "ex-01", progressionExerciseId: null, isPublic: true },

  { id: "ex-04", slug: "barra-fixa-pronada", name: "Barra fixa pronada",
    description: "Puxada classica para costas com pegada pronada.",
    instructions: ["Pegada um pouco mais aberta que os ombros.", "Puxe o queixo acima da barra.", "Desca controlado ate a extensao total."],
    commonMistakes: ["Balanco excessivo do corpo"], safetyNotes: "Aqueca ombros e escapulas antes.",
    primaryMuscles: ["costas"], secondaryMuscles: ["biceps", "core"], equipment: ["barra_fixa"], level: "intermediario", category: "forca",
    videoUrl: null, thumbnailUrl: null, regressionExerciseId: "ex-05", progressionExerciseId: null, isPublic: true },

  { id: "ex-05", slug: "remada-australiana", name: "Remada australiana",
    description: "Puxada horizontal com o corpo inclinado, alternativa sem barra fixa alta.",
    instructions: ["Segure em uma barra baixa ou mesa resistente.", "Corpo reto, calcanhares no chao.", "Puxe o peito em direcao a barra."],
    commonMistakes: ["Quadril caindo"], safetyNotes: "Verifique a resistencia do suporte.",
    primaryMuscles: ["costas"], secondaryMuscles: ["biceps", "core"], equipment: ["nenhum"], level: "iniciante", category: "forca",
    videoUrl: null, thumbnailUrl: null, regressionExerciseId: null, progressionExerciseId: "ex-04", isPublic: true },

  { id: "ex-06", slug: "agachamento-livre", name: "Agachamento livre",
    description: "Movimento fundamental de pernas com peso corporal.",
    instructions: ["Pes na largura dos ombros.", "Desca quadril para tras e para baixo.", "Suba empurrando o chao com os pes."],
    commonMistakes: ["Joelhos colapsando para dentro"], safetyNotes: "Mantenha a coluna neutra.",
    primaryMuscles: ["pernas", "gluteos"], secondaryMuscles: ["core"], equipment: ["nenhum"], level: "iniciante", category: "forca",
    videoUrl: null, thumbnailUrl: null, regressionExerciseId: null, progressionExerciseId: "ex-07", isPublic: true },

  { id: "ex-07", slug: "agachamento-bulgaro", name: "Agachamento bulgaro",
    description: "Agachamento unilateral com pe traseiro elevado.",
    instructions: ["Pe traseiro apoiado em um banco.", "Desca controlado na perna da frente.", "Suba sem empurrar com o pe de tras."],
    commonMistakes: ["Tronco muito inclinado"], safetyNotes: "Use apoio lateral se precisar de equilibrio.",
    primaryMuscles: ["pernas", "gluteos"], secondaryMuscles: ["core"], equipment: ["nenhum"], level: "intermediario", category: "forca",
    videoUrl: null, thumbnailUrl: null, regressionExerciseId: "ex-06", progressionExerciseId: null, isPublic: true },

  { id: "ex-08", slug: "prancha", name: "Prancha",
    description: "Isometria fundamental para estabilidade do core.",
    instructions: ["Apoie antebracos e pontas dos pes no chao.", "Mantenha o corpo em linha reta.", "Sustente contraindo abdomen e gluteos."],
    commonMistakes: ["Quadril elevado ou caido"], safetyNotes: "Pare se sentir dor lombar.",
    primaryMuscles: ["core"], secondaryMuscles: ["ombros"], equipment: ["nenhum"], level: "iniciante", category: "core",
    videoUrl: null, thumbnailUrl: null, regressionExerciseId: null, progressionExerciseId: "ex-09", isPublic: true },

  { id: "ex-09", slug: "hollow-body-hold", name: "Hollow body hold",
    description: "Isometria de core essencial para skills de calistenia.",
    instructions: ["Deite de costas, lombar pressionada no chao.", "Eleve pernas e ombros formando uma curva.", "Sustente sem perder o contato da lombar com o chao."],
    commonMistakes: ["Lombar arqueando"], safetyNotes: "Regrida flexionando os joelhos se sentir dor lombar.",
    primaryMuscles: ["core"], secondaryMuscles: [], equipment: ["nenhum"], level: "intermediario", category: "core",
    videoUrl: null, thumbnailUrl: null, regressionExerciseId: "ex-08", progressionExerciseId: null, isPublic: true },

  { id: "ex-10", slug: "paralelas-dips", name: "Paralelas (dips)",
    description: "Empurrao vertical para peito, ombros e triceps.",
    instructions: ["Apoie-se nas paralelas com bracos estendidos.", "Desca ate o ombro ficar levemente abaixo do cotovelo.", "Empurre de volta a extensao total."],
    commonMistakes: ["Amplitude excessiva sem mobilidade"], safetyNotes: "Evite descer alem do seu limite de mobilidade de ombro.",
    primaryMuscles: ["triceps", "peito"], secondaryMuscles: ["ombros"], equipment: ["paralelas"], level: "intermediario", category: "forca",
    videoUrl: null, thumbnailUrl: null, regressionExerciseId: null, progressionExerciseId: null, isPublic: true },

  { id: "ex-11", slug: "mountain-climber", name: "Mountain climber",
    description: "Exercicio dinamico de condicionamento e core.",
    instructions: ["Posicao de prancha alta.", "Traga um joelho ao peito e alterne rapidamente.", "Mantenha o quadril estavel."],
    commonMistakes: ["Quadril subindo demais"], safetyNotes: "Reduza o ritmo se sentir instabilidade no punho.",
    primaryMuscles: ["core"], secondaryMuscles: ["pernas", "ombros"], equipment: ["nenhum"], level: "iniciante", category: "condicionamento",
    videoUrl: null, thumbnailUrl: null, regressionExerciseId: null, progressionExerciseId: "ex-12", isPublic: true },

  { id: "ex-12", slug: "burpee", name: "Burpee",
    description: "Exercicio de corpo todo de alta intensidade.",
    instructions: ["Agache e apoie as maos no chao.", "Jogue os pes para tras em posicao de prancha.", "Retorne e salte para cima."],
    commonMistakes: ["Lombar hiperextendida na prancha"], safetyNotes: "Adapte removendo o salto se houver problemas articulares.",
    primaryMuscles: ["corpo_todo"], secondaryMuscles: ["core", "pernas", "peito"], equipment: ["nenhum"], level: "intermediario", category: "condicionamento",
    videoUrl: null, thumbnailUrl: null, regressionExerciseId: "ex-11", progressionExerciseId: null, isPublic: true },

  { id: "ex-13", slug: "l-sit-tuck", name: "L-sit tuck",
    description: "Introducao ao L-sit com joelhos flexionados.",
    instructions: ["Apoie as maos ao lado do quadril.", "Eleve o corpo flexionando os joelhos junto ao peito.", "Sustente com bracos estendidos."],
    commonMistakes: ["Ombros elevados junto as orelhas"], safetyNotes: "Fortaleca punhos antes de aumentar o tempo.",
    primaryMuscles: ["core"], secondaryMuscles: ["triceps", "ombros"], equipment: ["paralelas"], level: "intermediario", category: "skill",
    videoUrl: null, thumbnailUrl: null, regressionExerciseId: "ex-09", progressionExerciseId: null, isPublic: true },

  { id: "ex-14", slug: "mobilidade-punho-ombro", name: "Mobilidade de punho e ombro",
    description: "Rotina de mobilidade para preparar as articulacoes antes do treino.",
    instructions: ["Circundacoes de punho.", "Alongamento de flexores e extensores do antebraco.", "Circundacoes de ombro e mobilizacao escapular."],
    commonMistakes: ["Pular o aquecimento"], safetyNotes: "Movimentos leves e controlados, sem forcar a dor.",
    primaryMuscles: ["ombros"], secondaryMuscles: ["core"], equipment: ["nenhum"], level: "iniciante", category: "mobilidade",
    videoUrl: null, thumbnailUrl: null, regressionExerciseId: null, progressionExerciseId: null, isPublic: true },
];
