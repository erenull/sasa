export interface FormulaItem {
  title: string;
  latex: string;
  plain: string;
  description: string;
}

export interface SolvedExample {
  id: string;
  sourceLabel: string;
  title: string;
  question: string;
  diagramType?: 'vector-17n' | 'number-line' | 'vertical-throw' | 'oblique-throw' | 'river' | 'circular';
  steps: Array<{
    label: string;
    latex?: string;
    detail: string;
  }>;
  result: string;
  examTip?: string;
}

export interface ChapterData {
  id: 'olcu' | 'vektorler' | 'hiz-ivme' | 'anlik-hiz' | 'serbest-dusme';
  number: string;
  shortTitle: string;
  title: string;
  subtitle: string;
  definitions: Array<{
    term: string;
    text: string;
    unit?: string;
  }>;
  formulas: FormulaItem[];
  examples: SolvedExample[];
  keyTakeaways: string[];
}

export interface QuizQuestion {
  id: string;
  topic: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const COURSE_META = {
  university: 'Tekirdağ Namık Kemal Üniversitesi',
  school: 'Çorlu Meslek Yüksekokulu',
  department: 'Elektronik Teknolojisi Programı',
  course: 'Fizik I — 1. Vize Sınavı Hazırlık Notu',
  gValue: 'g = 10 m/s² (hassas sorularda 9,8 m/s²)',
};

export const KISAMUZ_TABLE = [
  { letter: 'K', quantity: 'Kütle', symbol: 'm', unit: 'Kilogram', unitSymbol: 'kg', tool: 'Eşit kollu terazi' },
  { letter: 'I', quantity: 'Işık Şiddeti', symbol: 'I', unit: 'Kandela', unitSymbol: 'cd', tool: 'Fotometre' },
  { letter: 'S', quantity: 'Sıcaklık', symbol: 'T', unit: 'Kelvin', unitSymbol: 'K', tool: 'Termometre' },
  { letter: 'A', quantity: 'Akım Şiddeti', symbol: 'I', unit: 'Amper', unitSymbol: 'A', tool: 'Ampermetre' },
  { letter: 'M', quantity: 'Madde Miktarı', symbol: 'n', unit: 'Mol', unitSymbol: 'mol', tool: 'Hesaplama' },
  { letter: 'U', quantity: 'Uzunluk', symbol: 'l / x', unit: 'Metre', unitSymbol: 'm', tool: 'Şerit metre / Kumpas' },
  { letter: 'Z', quantity: 'Zaman', symbol: 't', unit: 'Saniye', unitSymbol: 's', tool: 'Kronometre' },
];

export const SI_PREFIXES = [
  { prefix: 'Giga', symbol: 'G', factor: '10⁹', example: '1 GHz = 10⁹ Hz' },
  { prefix: 'Mega', symbol: 'M', factor: '10⁶', example: '1 MΩ = 10⁶ Ω' },
  { prefix: 'Kilo', symbol: 'k', factor: '10³', example: '1 km = 1000 m' },
  { prefix: 'Santi', symbol: 'c', factor: '10⁻²', example: '100 cm = 1 m' },
  { prefix: 'Mili', symbol: 'm', factor: '10⁻³', example: '1 mA = 10⁻³ A' },
  { prefix: 'Mikro', symbol: 'μ', factor: '10⁻⁶', example: '1 μF = 10⁻⁶ F' },
  { prefix: 'Nano', symbol: 'n', factor: '10⁻⁹', example: '1 ns = 10⁻⁹ s' },
];

export const TRIG_VALUES = [
  { angle: '30°', sin: '0,5 (1/2)', cos: '0,866 (√3/2 ≈ 0,7*)', tan: '1/√3' },
  { angle: '37°', sin: '0,6 (3/5)', cos: '0,8 (4/5)', tan: '0,75 (3/4)' },
  { angle: '45°', sin: '0,707 (√2/2)', cos: '0,707 (√2/2)', tan: '1' },
  { angle: '53°', sin: '0,8 (4/5)', cos: '0,6 (3/5)', tan: '1,33 (4/3)' },
  { angle: '60°', sin: '0,866 (√3/2)', cos: '0,5 (1/2)', tan: '√3' },
];

export const CHAPTERS: ChapterData[] = [
  {
    id: 'olcu',
    number: '01',
    shortTitle: 'Ölçü',
    title: 'Ölçü, SI Birim Sistemi ve Temel Fizik Tanımları',
    subtitle:
      'Ölçme ilkeleri, KISAMUZ temel büyüklükleri, elektronik ön ekleri ve hocanın PDF’indeki temel tanımlar.',
    definitions: [
      {
        term: 'Fizik (PDF Sayfa 1)',
        text: 'Maddeyi, enerjiyi, uzay ve zaman kavramlarını; bunlar arasındaki temel etkileşimleri sebep-sonuç ilişkisi çerçevesinde inceleyen doğa bilimidir. Alt dalları: Mekanik, Termodinamik, Optik, Elektromanyetizma, Atom Fiziği ve Nükleer Fiziktir.',
      },
      {
        term: 'Ölçme ve Ölçü',
        text: 'Bilinmeyen bir fiziksel büyüklüğün, kendi cinsinden kabul edilmiş bir standart birimle karşılaştırılmasıdır. Doğrudan ölçme (cetvel, ampermetre) ve dolaylı ölçme (formülle özkütle veya hız hesabı) olarak ikiye ayrılır.',
      },
      {
        term: 'Skaler ve Vektörel Büyüklük',
        text: 'Yalnızca sayı ve birimle ifade edilen büyüklükler skalerdir (kütle, zaman, sıcaklık, sürat, enerji). Sayı ve birimin yanında yön ve doğrultu gerektiren büyüklükler vektöreldir (kuvvet, hız, ivme, yer değiştirme, konum).',
      },
      {
        term: 'Kuvvet (PDF Sayfa 1)',
        text: 'Kütlesi olan bir cismin hızını, yönünü veya şeklini değiştirebilen ya da duran bir cismi harekete geçirebilen vektörel etkidir. Dinamometre ile ölçülür.',
        unit: 'Newton (N)',
      },
      {
        term: 'Özkütle / Yoğunluk (PDF Sayfa 2)',
        text: 'Bir maddenin birim hacmindeki kütle miktarıdır.',
        unit: 'g/cm³ veya kg/m³',
      },
      {
        term: 'Newton Yasaları (PDF Sayfa 3)',
        text: '1) Eylemsizlik: Dengelenmemiş net dış kuvvet yoksa cisim hareket durumunu korur. 2) Dinamik: Net kuvvet kütle ile ivmenin çarpımına eşittir (F = m·a). 3) Etki-Tepki: Her etkiye karşılık eşit büyüklükte ve zıt yönde tepki kuvveti vardır.',
      },
    ],
    formulas: [
      {
        title: 'Hız Birim Dönüşümü',
        latex: '1\\,\\text{m/s} = 3{,}6\\,\\text{km/h} \\quad\\Longleftrightarrow\\quad \\text{km/h} \\div 3{,}6 = \\text{m/s}',
        plain: '1 m/s = 3,6 km/h  |  km/h ÷ 3,6 = m/s',
        description: 'Sınavda hız km/h verilirse mutlaka 3,6’ya bölerek m/s’ye çevir.',
      },
      {
        title: 'Özkütle (Yoğunluk)',
        latex: 'd = \\frac{m}{V}',
        plain: 'd = m / V',
        description: 'm: kütle (g veya kg), V: hacim (cm³ veya m³).',
      },
      {
        title: 'Newton’un 2. Yasası (Dinamik)',
        latex: '\\vec{F}_{\\text{net}} = m \\cdot \\vec{a}',
        plain: 'F_net = m · a',
        description: 'İvme net kuvvetle doğru, kütleyle ters orantılıdır ve kuvvetle aynı yöndedir.',
      },
      {
        title: 'Ağırlık Kuvveti',
        latex: 'G = m \\cdot g',
        plain: 'G = m · g',
        description: 'm kütleli cisme etki eden yer çekimi kuvvetidir (g = 10 m/s²).',
      },
    ],
    examples: [
      {
        id: 'olcu-ex-1',
        sourceLabel: 'Birim Dönüşümü & Temel Uygulama',
        title: 'Hız, Zaman ve Elektronik Ön Ek Dönüşümleri',
        question:
          'a) Saatte 72 km hızla giden bir aracın hızı kaç m/s’dir? b) 10 dakika kaç saniyedir? c) Elektronik devrede ölçülen 450 mA akım kaç Amper (A) ve kaç mikroamper (μA) eder?',
        steps: [
          {
            label: 'a) km/h → m/s dönüşümü',
            latex: 'v = \\frac{72}{3{,}6} = 20\\,\\text{m/s}',
            detail: '72 km = 72.000 m, 1 saat = 3600 s olduğundan 72.000 / 3600 = 20 m/s bulunur.',
          },
          {
            label: 'b) Dakika → Saniye dönüşümü',
            latex: 't = 10 \\times 60 = 600\\,\\text{s}',
            detail: 'SI zaman birimi saniyedir. Nehir ve hareket sorularında dakika verilirse saniyeye çevirmeye dikkat et.',
          },
          {
            label: 'c) Amper ön ekleri (mili ↔ mikro)',
            latex: '450\\,\\text{mA} = 450 \\times 10^{-3}\\,\\text{A} = 0{,}45\\,\\text{A} = 450.000\\,\\mu\\text{A}',
            detail: '1 mA = 10⁻³ A ve 1 A = 10⁶ μA olduğu için mili’den mikro’ya geçerken 10³ ile çarpılır.',
          },
        ],
        result: 'a) 20 m/s  |  b) 600 s  |  c) 0,45 A ve 450.000 μA',
        examTip: 'SI dışı birim gördüğünde (km/h, dakika, cm, gram) işlem yapmadan önce mutlaka SI birimine (m, s, kg) çevir.',
      },
    ],
    keyTakeaways: [
      'Temel büyüklükleri KISAMUZ akrostişiyle hatırla; skalerdirler ve tek bir ölçüm aletiyle ölçülürler.',
      'Kuvvet, hız, ivme ve yer değiştirme vektörel; kütle, zaman, özkütle ve sürat skalerdir.',
      'Ölçüm hataları sistematik (alet/kalibrasyon) ve rastgele (okuma/ortam) hatalar olarak ikiye ayrılır.',
    ],
  },
  {
    id: 'vektorler',
    number: '02',
    shortTitle: 'Vektörler',
    title: 'Vektörler, Bileşenlere Ayırma ve Birim Vektörler',
    subtitle:
      'Uç uca ekleme, kosinüs teoremi, geometrik çıkarma, birim vektör işlemleri ve 37°-53° bileşen soruları.',
    definitions: [
      {
        term: 'Vektör (Tablet Notu)',
        text: 'Yönü, doğrultusu, büyüklüğü (şiddeti) ve başlangıç noktası olan fiziksel büyüklüklerdir. Üzerine ok (→) konularak gösterilir.',
      },
      {
        term: 'Uç Uca Ekleme & Değişme Özelliği',
        text: 'Verilen tüm vektörler yön ve büyüklüğü bozulmadan birinin bitişine diğerinin başlangıcı gelecek şekilde uç uca eklenir. İlk başlangıçtan son bitişe çizilen vektör bileşke (toplam) vektördür: a + b = b + a = c.',
      },
      {
        term: 'Geometrik Çıkarma (Tablet Notu)',
        text: 'Vektörlerde çıkarma işlemi, çıkarılan vektörün tersinin (negatifinin, yani 180° zıt yönlüsünün) alınıp toplanmasıdır: a − b = a + (−b).',
      },
      {
        term: 'Birim Vektörler (i, j, k)',
        text: 'x, y ve z eksenleri doğrultusunda büyüklüğü 1 birim olan yön göstericileridir. Birim vektörlerle toplama/çıkarma yapılırken yalnızca aynı eksen katsayıları (i ile i, j ile j, k ile k) toplanıp çıkarılır.',
      },
    ],
    formulas: [
      {
        title: 'Kosinüs Teoremi (Toplama / Çıkarma)',
        latex: 'c = \\sqrt{a^2 + b^2 \\pm 2ab\\cos\\theta}',
        plain: 'c = √(a² + b² ± 2ab·cosθ)',
        description: 'Vektörlerin başlangıçları birleştirildiğinde aradaki açı θ ise toplama için (+), çıkarma için (−) kullanılır.',
      },
      {
        title: 'Dik Bileşenlere Ayırma',
        latex: 'F_x = F\\cos\\theta, \\quad F_y = F\\sin\\theta',
        plain: 'Fx = F·cosθ,  Fy = F·sinθ',
        description: 'Açıya komşu eksen cosθ, açının karşısındaki eksen sinθ ile çarpılır (PDF Sayfa 2 trigonometri kutusu).',
      },
      {
        title: 'Bileşke Büyüklüğü (Pisagor)',
        latex: 'F_b = \\sqrt{F_{x,\\text{top}}^2 + F_{y,\\text{top}}^2}',
        plain: 'Fb = √(Fx_top² + Fy_top²)',
        description: 'Tüm x bileşenleri ve tüm y bileşenleri ayrı ayrı toplandıktan sonra Pisagor bağıntısı uygulanır.',
      },
      {
        title: 'Birim Vektör Büyüklüğü',
        latex: '\\vec{F} = F_x\\hat{i} + F_y\\hat{j} + F_z\\hat{k} \\implies |\\vec{F}| = \\sqrt{F_x^2 + F_y^2 + F_z^2}',
        plain: 'F = Fx·i + Fy·j + Fz·k  =>  |F| = √(Fx² + Fy² + Fz²)',
        description: 'Üç boyutlu birim vektör gösterimi ve vektörün şiddeti.',
      },
    ],
    examples: [
      {
        id: 'vek-ex-1',
        sourceLabel: 'PDF Sayfa 4 — Hocanın Örneği',
        title: 'Birim Vektörler ile Toplama ve Çıkarma',
        question:
          'Birim vektörler cinsinden sayısal değerleri verilen F₁ = 5i + 3j + 2k, F₂ = i + k ve F₃ = −2j + 3k vektörleri için F₁ + F₂ = ? ve F₃ − F₂ = ? bulunuz.',
        steps: [
          {
            label: '1) F₁ + F₂ toplamı',
            latex: '\\vec{F}_1 + \\vec{F}_2 = (5\\hat{i} + 3\\hat{j} + 2\\hat{k}) + (1\\hat{i} + 0\\hat{j} + 1\\hat{k}) = 6\\hat{i} + 3\\hat{j} + 3\\hat{k}',
            detail: 'Olmayan eksen katsayısı 0 kabul edilir: i’ler (5+1=6), j’ler (3+0=3), k’lar (2+1=3).',
          },
          {
            label: '2) F₃ − F₂ farkı (Matematiksel doğru çözüm)',
            latex: '\\vec{F}_3 - \\vec{F}_2 = (0\\hat{i} - 2\\hat{j} + 3\\hat{k}) - (1\\hat{i} + 0\\hat{j} + 1\\hat{k}) = -\\hat{i} - 2\\hat{j} + 2\\hat{k}',
            detail: 'F₃ = −2j + 3k verildiği için i katsayısı 0 − 1 = −1, j katsayısı −2, k katsayısı 3 − 1 = +2 olur.',
          },
        ],
        result: 'F₁ + F₂ = 6i + 3j + 3k  |  F₃ − F₂ = −i − 2j + 2k',
        examTip:
          'PDF Sayfa 4 el yazısında F₃ = −2j + 3k yazılmasına rağmen işlem satırında yanlışlıkla (−2i + 3k) − (i + k) = −3i + 2k yapılmış. Sınavda verilen harfi (i mi j mi) mutlaka iki kez kontrol et!',
      },
      {
        id: 'vek-ex-2',
        sourceLabel: 'PDF Sayfa 5 — Hocanın Örneği',
        title: 'Kuvvetlerin Dik Bileşenlere Ayrılması (37° - 53°)',
        question:
          '1. bölgede yatayla 37° açı yapan F₁ = 25 N, 2. bölgede yatayla 53° açı yapan F₂ = 20 N ve −y yönünde F₃ = 16 N kuvvetlerinin bileşkesi kaç N’dur? (sin53° = cos37° = 0,8; sin37° = cos53° = 0,6)',
        diagramType: 'vector-17n',
        steps: [
          {
            label: '1) F₁ kuvvetinin bileşenleri (+x, +y)',
            latex: '\\begin{aligned} F_{1x} &= 25 \\cdot \\cos 37^\\circ = 25 \\cdot 0{,}8 = +20\\,\\text{N} \\\\ F_{1y} &= 25 \\cdot \\sin 37^\\circ = 25 \\cdot 0{,}6 = +15\\,\\text{N} \\end{aligned}',
            detail: '1. bölgede hem x hem y bileşeni pozitiftir.',
          },
          {
            label: '2) F₂ kuvvetinin bileşenleri (−x, +y)',
            latex: '\\begin{aligned} F_{2x} &= -20 \\cdot \\cos 53^\\circ = -20 \\cdot 0{,}6 = -12\\,\\text{N} \\\\ F_{2y} &= 20 \\cdot \\sin 53^\\circ = 20 \\cdot 0{,}8 = +16\\,\\text{N} \\end{aligned}',
            detail: 'F₂ sola baktığı için x bileşeni eksi (−12 N), yukarı baktığı için y bileşeni artı (+16 N) alınır.',
          },
          {
            label: '3) F₃ bileşeni ve eksen toplamları',
            latex: '\\begin{aligned} F_{x,\\text{top}} &= 20 - 12 + 0 = 8\\,\\text{N} \\\\ F_{y,\\text{top}} &= 15 + 16 - 16 = 15\\,\\text{N} \\end{aligned}',
            detail: 'F₃ tamamen −y yönünde olduğu için F₃x = 0, F₃y = −16 N’dur.',
          },
          {
            label: '4) Bileşke kuvvet (8-15-17 özel üçgeni)',
            latex: 'F_b = \\sqrt{8^2 + 15^2} = \\sqrt{64 + 225} = \\sqrt{289} = 17\\,\\text{N}',
            detail: 'Özel dik üçgeni (8-15-17) tanırsan karekökü saniyeler içinde bulursun.',
          },
        ],
        result: 'F_bileşke = 17 N',
      },
      {
        id: 'vek-ex-3',
        sourceLabel: 'Tablet Notu — Kosinüs Teoremi Örneği',
        title: 'Kuzey ve Kuzeybatı Yönünde Yürüyen Kişinin Yer Değiştirmesi',
        question:
          'Kuzeye doğru 20 km yürüyen bir kişi, bu hareketinden sonra kuzeyle 60° açı yapacak şekilde kuzeybatıya doğru 35 km daha yürürse ilk konum ile son konum arasındaki mesafe (yer değiştirme) kaç km olur?',
        steps: [
          {
            label: '1) Kosinüs teoremini kurma',
            latex: 'x = \\sqrt{20^2 + 35^2 + 2 \\cdot 20 \\cdot 35 \\cdot \\cos 60^\\circ}',
            detail: 'İlk vektör kuzeye, ikinci vektör kuzeyle 60° açı yapacak şekilde devam ettiğinden aralarındaki açı 60° (cos 60° = 0,5) alınır.',
          },
          {
            label: '2) Kareleri ve çarpımı doğru hesaplama',
            latex: 'x = \\sqrt{400 + 1225 + 1400 \\cdot 0{,}5} = \\sqrt{400 + 1225 + 700} = \\sqrt{2325} \\approx 48{,}22\\,\\text{km}',
            detail: 'Her terimin karesi tek tek alınır ve toplanır.',
          },
        ],
        result: 'x = √2325 ≈ 48,22 km',
        examTip:
          'Tablet fotoğrafında 20² ve 35² yerine kare alma unutulup işlem yarım kalmış (55 + ...). Sınavda kareleri (400 ve 1225) mutlaka hesaplamayı unutma!',
      },
      {
        id: 'vek-ex-4',
        sourceLabel: 'PDF Sayfa 6 — Nehir Problemi',
        title: 'Nehirde Karşıya Geçen Kayığın Bileşke Hızı ve Sürüklenmesi',
        question:
          'Akıntı hızı V_nehir = 3 m/s olan nehirde, suya göre karşı kıyıya dik V_kayık = 4 m/s hızla giren kayık 10 saniyede karşı kıyıya ulaşıyorsa: a) Bileşke hız b) Nehrin genişliği c) Sürüklenme miktarı nedir?',
        diagramType: 'river',
        steps: [
          {
            label: 'a) Bileşke hız (3-4-5 üçgeni)',
            latex: 'V_b = \\sqrt{V_k^2 + V_n^2} = \\sqrt{4^2 + 3^2} = \\sqrt{25} = 5\\,\\text{m/s}',
            detail: 'İki hız birbirine dik olduğundan Pisagor uygulanır.',
          },
          {
            label: 'b) Nehrin genişliği (düşey yol)',
            latex: 'd = V_{\\text{kayık}} \\cdot t = 4 \\cdot 10 = 40\\,\\text{m}',
            detail: 'Karşı kıyıya geçişi yalnızca karşıya dik hız (V_kayık) belirler.',
          },
          {
            label: 'c) Sürüklenme miktarı (yatay yol)',
            latex: 'x_{\\text{yatay}} = V_{\\text{nehir}} \\cdot t = 3 \\cdot 10 = 30\\,\\text{m}',
            detail: 'Akıntı boyunca sürüklenmeyi yalnızca nehir hızı belirler.',
          },
        ],
        result: 'Vb = 5 m/s  |  Genişlik = 40 m  |  Sürüklenme = 30 m',
        examTip:
          'PDF Sayfa 6’da soruda "10 dakika" yazılmış ama çözümde doğrudan 10 saniye gibi çarpılmış (4·10=40). Sınavda hoca dakika verirse 10 dk = 600 s çevirip d = 2400 m, x = 1800 m alman gerekip gerekmediğini kontrol et.',
      },
    ],
    keyTakeaways: [
      '2. ve 3. bölgedeki bileşenlerin (−) işaretlerini koymayı unutma.',
      '3-4-5, 6-8-10, 5-12-13 ve 8-15-17 özel dik üçgenleri sınavda çok hız kazandırır.',
      'Birim vektör çıkarırken eksi işaretini parantez içindeki tüm terimlere dağıt.',
    ],
  },
  {
    id: 'hiz-ivme',
    number: '03',
    shortTitle: 'Hız & Sürat',
    title: 'Ortalama Hız, Ortalama Sürat, Ortalama İvme ve Sabit İvmeli Hareket',
    subtitle:
      'Konum ve yer değiştirme farkı, sayı doğrusu soruları ve beyaz tahtadaki 5 temel kinematik denklem.',
    definitions: [
      {
        term: 'Konum Vektörü (Tablet Notu)',
        text: 'Cismin bulunduğu koordinat sisteminde seçilen referans (başlangıç) noktasına göre yerini belirten vektördür (x).',
      },
      {
        term: 'Yer Değiştirme (Δx) vs. Alınan Yol',
        text: 'Yer değiştirme ilk konum ile son konum arasındaki en kısa yönlü farktır (Δx = x₂ − x₁, vektörel ve eksi olabilir). Alınan yol ise cismin izlediği tüm yörüngenin uzunluğudur (skaler ve daima pozitiftir).',
      },
      {
        term: 'Ortalama Hız vs. Ortalama Sürat',
        text: 'Ortalama hız yer değiştirmenin zamana bölümüdür (vektörel, yön belirtir). Ortalama sürat ise toplam alınan yolun zamana bölümüdür (skalerdir).',
        unit: 'm/s',
      },
      {
        term: 'Ortalama İvme (Tahta & PDF Sayfa 1)',
        text: 'Bir cismin hızının (büyüklüğünün veya yönünün) birim zamandaki değişim oranıdır.',
        unit: 'm/s²',
      },
    ],
    formulas: [
      {
        title: 'Ortalama Hız (Vektörel)',
        latex: 'V_{\\text{ort}} = \\frac{\\Delta x}{\\Delta t} = \\frac{x_2 - x_1}{t_2 - t_1}',
        plain: 'V_ort = (x2 - x1) / (t2 - t1)',
        description: 'Son konumdan ilk konum çıkarılır; yön sola/geriye ise sonuç negatif çıkar.',
      },
      {
        title: 'Ortalama Sürat (Skaler)',
        latex: '\\text{Ortalama Sürat} = \\frac{\\text{Alınan Toplam Yol}}{\\text{Toplam Süre}}',
        plain: 'Sürat = Toplam Yol / Toplam Süre',
        description: 'Gidiş ve dönüş mesafelerinin mutlak değerleri toplanır.',
      },
      {
        title: 'Ortalama İvme',
        latex: 'a_{\\text{ort}} = \\frac{V_s - V_0}{t_2 - t_1}',
        plain: 'a_ort = (Vs - V0) / t',
        description: 'Son hızdan ilk hız çıkarılıp geçen zamana bölünür.',
      },
      {
        title: 'Tahtadaki 5 Temel Sabit İvmeli Hareket Denklemi',
        latex: '\\begin{aligned} &1)\\; V_s = V_0 + a \\cdot t \\qquad 2)\\; x_s - x_0 = V_0 \\cdot t + \\frac{1}{2} a t^2 \\\\ &3)\\; V_s^2 = V_0^2 + 2a(x_s - x_0) \\qquad 4)\\; x_s - x_0 = V_{\\text{ort}} \\cdot t = \\frac{1}{2}(V_0 + V_s)\\cdot t \\end{aligned}',
        plain: '1) Vs = V0 + a·t  |  2) xs - x0 = V0·t + ½·a·t²  |  3) Vs² = V0² + 2a(xs - x0)  |  4) xs - x0 = ½(V0 + Vs)·t',
        description: 'Beyaz tahta fotoğrafında hocanın yıldızladığı 5 denklem. Verilenlere göre zaman yoksa 3. denklemi (zamansız hız) seç!',
      },
    ],
    examples: [
      {
        id: 'hiz-ex-1',
        sourceLabel: 'Tablet Notu — Sayı Doğrusu Örneği',
        title: 'Gidip Geri Dönen Arabanın Ortalama Hızı ve Ortalama Sürati',
        question:
          'Bir araba 1. noktadan (x₁ = 30 m) harekete başlayıp önce sağdaki 2. noktaya (x₂ = 52 m, yani +22 m) gidiyor, ardından geri dönüp 0 ve 3 noktasından geçerek 4. noktaya (x₄ = −53 m) toplam 50 saniyede ulaşıyor. a) Ortalama hız b) Ortalama sürat nedir?',
        diagramType: 'number-line',
        steps: [
          {
            label: 'a) Ortalama Hız (yalnızca ilk ve son konum)',
            latex: 'V_{\\text{ort}} = \\frac{x_{\\text{son}} - x_{\\text{ilk}}}{\\Delta t} = \\frac{-53 - 30}{50} = \\frac{-83}{50} = -1{,}66\\,\\text{m/s}',
            detail: 'Başlangıç x₁ = +30 m, bitiş x₄ = −53 m olduğu için yer değiştirme −83 m’dir. Eksi işareti net hareketin −x yönünde olduğunu gösterir.',
          },
          {
            label: 'b) Ortalama Sürat (alınan tüm yolların toplamı)',
            latex: '\\text{Yol} = |52 - 30| + |52 - 0| + |0 - (-53)| = 22 + 52 + 53 = 127\\,\\text{m}',
            detail: '1→2 arası 22 m ileri, 2→0 arası 52 m geri, 0→4 arası 53 m daha geri gittiği için toplam alınan yol 127 m’dir.',
          },
          {
            label: 'Sürat hesabı',
            latex: '\\text{Sürat} = \\frac{127}{50} = 2{,}54\\,\\text{m/s}',
            detail: 'Toplam yol toplam süreye (50 s) bölünür.',
          },
        ],
        result: 'Ortalama Hız = −1,66 m/s  |  Ortalama Sürat = 2,54 m/s',
        examTip:
          'Tablet notunda −53 − 30 işlemi −85 yazılıp −1,66 olarak doğruya yakın verilmiş; doğrusu −83 / 50 = −1,66 m/s’dir. İşlem adımlarında −83/50 yazman tam puan getirir.',
      },
      {
        id: 'hiz-ex-2',
        sourceLabel: 'Beyaz Tahta & Tablet — Sabit İvmeli Hareket',
        title: '10 Saniyede Hızlanan Cismin İvmesi ve Aldığı Yollar',
        question:
          'x ekseni boyunca hareket eden bir cisim 10 saniye içinde hızını 10 m/s’den 30 m/s’ye çıkarırsa: a) Ortalama ivmesi nedir? b) Sürenin yarısında (t = 5 s) ne kadar yol alır? c) Sürenin tamamında (t = 10 s) ne kadar yol alır?',
        steps: [
          {
            label: 'a) Ortalama İvme',
            latex: 'a_{\\text{ort}} = \\frac{V_s - V_0}{t} = \\frac{30 - 10}{10} = \\frac{20}{10} = 2\\,\\text{m/s}^2',
            detail: 'Hız 10 saniyede 20 m/s arttığı için ivme saniyede 2 m/s²’dir.',
          },
          {
            label: 'b) Sürenin yarısında (t = 5 s) alınan yol',
            latex: 'x_s - 0 = V_0 t + \\frac{1}{2} a t^2 = 10 \\cdot 5 + \\frac{1}{2} \\cdot 2 \\cdot 5^2 = 50 + 25 = 75\\,\\text{m}',
            detail: 'Tahtadaki sağ alt çözümle birebir aynıdır: x_s = 75 m.',
          },
          {
            label: 'c) Sürenin tamamında (t = 10 s) alınan yol',
            latex: 'x_s = 10 \\cdot 10 + \\frac{1}{2} \\cdot 2 \\cdot 10^2 = 100 + 100 = 200\\,\\text{m}',
            detail: 'Kısa yol kontrolü: V_ort · t = ½(10 + 30) · 10 = 20 · 10 = 200 m!',
          },
        ],
        result: 'a) 2 m/s²  |  b) 75 m  |  c) 200 m',
        examTip: 'Tablet notunun c şıkkında harf hatasıyla Vs = 200 yazılmış ama doğrusu tahtadaki gibi x_s = 200 m’dir.',
      },
    ],
    keyTakeaways: [
      'Ortalama hızda sadece ilk ve son noktaya bakılır; süratte aracın geri döndüğü tüm mesafeler toplanır.',
      'Zaman verilmemişse zamansız hız denklemi Vs² = V0² + 2aΔx hayat kurtarır.',
      'Sağlamasını yapmak için Δx = ½(V0 + Vs)·t formülünü mutlaka kullan.',
    ],
  },
  {
    id: 'anlik-hiz',
    number: '04',
    shortTitle: 'Anlık Hız',
    title: 'Anlık Hız ve Konum Denkleminin Zamana Göre Türevi',
    subtitle:
      'Limit tanımı, polinom türev kuralı ve hocanın tahtada çözdüğü x(t) = −4t + 2t² sorusu.',
    definitions: [
      {
        term: 'Anlık Hız (Tahta & Tablet)',
        text: 'Zaman aralığı Δt sıfıra yaklaşırken ortalama hızın limit değeridir. Yani cismin konum denkleminin x(t) zamana göre 1. dereceden türevidir.',
        unit: 'm/s',
      },
      {
        term: 'Polinom Türev Alma Kuralı',
        text: 'Her terimde üs başa çarpım olarak indirilir ve üs 1 azaltılır: (A·tⁿ)′ = A·n·tⁿ⁻¹. Birinci dereceden terimin (bt) türevi katsayısı (b), sabit sayının türevi ise 0’dır.',
      },
      {
        term: 'Anlık İvme İlişkisi (Ekstra)',
        text: 'Hız denkleminin v(t) zamana göre bir kez daha türevi alınırsa anlık ivme a(t) = dv/dt bulunur.',
      },
    ],
    formulas: [
      {
        title: 'Limit ve Türev Tanımı',
        latex: 'V_{\\text{anlık}} = \\lim_{\\Delta t \\to 0} \\frac{\\Delta x}{\\Delta t} = \\frac{dx}{dt}',
        plain: 'V_anlık = lim(Δt→0) Δx/Δt = dx/dt',
        description: 'Tahtanın sol üst köşesinde hocanın yazdığı temel tanım.',
      },
      {
        title: 'Kuvvet Kuralı ile Hız Fonksiyonu',
        latex: 'x(t) = a t^2 + b t + c \\implies v(t) = \\frac{dx}{dt} = 2 a t + b',
        plain: 'x(t) = a·t² + b·t + c  =>  v(t) = 2a·t + b',
        description: '2·t² teriminin türevi 2·2·t¹ = 4t, −4t teriminin türevi −4 olur.',
      },
    ],
    examples: [
      {
        id: 'anlik-ex-1',
        sourceLabel: 'Beyaz Tahta & Tablet — Birebir Sınav Tipi Soru',
        title: 'Konum-Zaman Denklemi x(t) = −4t + 2t² Olan Cismin Hızı',
        question:
          'x ekseni boyunca hareket eden bir cismin konum-zaman denklemi x(t) = −4t + 2t² dir. 1) (0−1) ve (1−3) saniye aralıklarında cismin ortalama hızını bulunuz. 2) t = 2,5 saniyedeki anlık hızı nedir?',
        steps: [
          {
            label: '1a) (0 − 1) saniye aralığında ortalama hız',
            latex: 'V_{\\text{ort}(0-1)} = \\frac{x(1) - x(0)}{1 - 0} = \\frac{(-4 \\cdot 1 + 2 \\cdot 1^2) - (-4 \\cdot 0 + 2 \\cdot 0^2)}{1} = \\frac{-4 + 2}{1} = -2\\,\\text{m/s}',
            detail: 'Önce x(1) = −2 m ve x(0) = 0 m konumları hesaplanıp zaman aralığına (1 s) bölünür.',
          },
          {
            label: '1b) (1 − 3) saniye aralığında ortalama hız',
            latex: 'x(3) = -4(3) + 2(3)^2 = -12 + 18 = 6\\,\\text{m} \\implies V_{\\text{ort}(1-3)} = \\frac{x(3) - x(1)}{3 - 1} = \\frac{6 - (-2)}{2} = \\frac{8}{2} = 4\\,\\text{m/s}',
            detail: 'Tahtada 1. şıkta (1−3) aralığı da sorulmuş! Eksi ile eksinin çarpımının (+) olduğuna dikkat et: 6 − (−2) = 8.',
          },
          {
            label: '2) Türev alarak t = 2,5 s’deki anlık hızı bulma',
            latex: 'v(t) = \\frac{dx}{dt} = -4 \\cdot 1 \\cdot t^{1-1} + 2 \\cdot 2 \\cdot t^{2-1} = -4 + 4t',
            detail: 'Tahtadaki sağ kısımda gösterilen türev adımı: üsler 1 azaltılır.',
          },
          {
            label: 't = 2,5 s değerini yerine koyma',
            latex: 'v(2{,}5) = -4 + 4 \\cdot 2{,}5 = -4 + 10 = 6\\,\\text{m/s}',
            detail: 't yerine 2,5 yazıldığında anlık hız 6 m/s çıkar.',
          },
        ],
        result: 'V_ort(0-1) = −2 m/s  |  V_ort(1-3) = 4 m/s  |  V(2,5 s) = 6 m/s',
        examTip:
          'Sınavda hoca "aralık" (ör. 1–3 sn) sorarsa ortalama hız (x₂−x₁)/(t₂−t₁) yap; "tek bir saniye" (ör. 2,5 sn) sorarsa mutlaka türev al!',
      },
    ],
    keyTakeaways: [
      'Aralık sorulursa: Δx / Δt (Ortalama hız). Tek an sorulursa: dx / dt (Türev ile Anlık hız).',
      'x(t) = −4t + 2t² denkleminde t=1 s anında v(1)=0 olur, yani cisim yön değiştirir.',
      'Parantez işaretlerine özellikle x(1) = −2 değerini çıkarırken dikkat et.',
    ],
  },
  {
    id: 'serbest-dusme',
    number: '05',
    shortTitle: 'Serbest Düşme',
    title: 'Serbest Düşme, Düşey Atış ve Eğik Atış (+ Dairesel Hareket)',
    subtitle:
      'Yer çekimi ivmesi g = 10 m/s², yukarı yönlü düşey atış, yüksekten eğik atış ve PDF’teki tüm atış örnekleri.',
    definitions: [
      {
        term: 'Serbest Düşme (Tablet Notu)',
        text: 'Dünya yüzeyinde bulunan cisimler büyüklüğü g ≈ 9,8 m/s² (sınavda 10 m/s²) olan ve yönü Dünya’nın merkezine doğru olan yer çekimi ivmesiyle hareket ederler. İlk hızsız (V₀ = 0) bırakılmaya serbest düşme denir.',
      },
      {
        term: 'Tepe Noktası Kuralı',
        text: 'Yukarı doğru atılan bir cisim çıkabileceği maksimum yükseklikte anlık olarak durur, yani tepe noktasında düşey hızı V_y = 0 olur. Tepe noktasından sonra hareket tamamen serbest düşmedir.',
      },
      {
        term: 'Yatay Hız Sabitliği (Eğik Atış)',
        text: 'Hava direnci ihmal edildiğinde yatay doğrultuda kuvvet etki etmez; bu nedenle yatay hız V_x hareket boyunca sabit kalır ve menzil x = V_x · t_toplam ile bulunur.',
      },
    ],
    formulas: [
      {
        title: 'Serbest Düşme (V₀ = 0, Aşağı Yön +)',
        latex: 'h = \\frac{1}{2} g t^2 \\qquad V_{\\text{son}} = g \\cdot t \\qquad V_s^2 = 2 g h',
        plain: 'h = ½·g·t²  |  Vson = g·t  |  Vs² = 2·g·h',
        description: 'PDF Sayfa 2 kutusundaki temel düşme denklemleri. 5-15-25-35 m pratik yol kuralı buradan gelir.',
      },
      {
        title: 'Yukarı Düşey Atış (Yukarı Yön +)',
        latex: 'V_s = V_0 - g t \\qquad y_s - y_0 = V_0 t - \\frac{1}{2} g t^2 \\qquad V_s^2 = V_0^2 - 2g(y_s - y_0)',
        plain: 'Vs = V0 - g·t  |  ys - y0 = V0·t - ½·g·t²  |  Vs² = V0² - 2g(ys - y0)',
        description: 'Tablet notundaki denklemler. Çıkarken g yavaşlatıcı olduğu için eksi (−) kullanılır.',
      },
      {
        title: 'Düzgün Dairesel Hareket (PDF Sayfa 2 & 4)',
        latex: 'a_{\\text{mer}} = \\frac{V^2}{r}, \\qquad F_{\\text{mer}} = \\frac{m \\cdot V^2}{r}',
        plain: 'a_mer = V² / r  |  F_mer = m · V² / r',
        description: 'Düşey düzlemde en alt noktada (saat 6 yönü) ip gerilmesi T = G + F_mer = mg + mV²/r olur.',
      },
    ],
    examples: [
      {
        id: 'dusme-ex-1',
        sourceLabel: 'PDF Sayfa 8 — Hocanın Örneği',
        title: '80 m Yükseklikten Yukarı V₀ = 30 m/s Hızla Atılan Cisim',
        question:
          '80 m yükseklikten yukarı yönlü V₀ = 30 m/s hızla atılan m kütleli cisim için (g = 10 m/s²): a) Çıkabileceği maksimum ek yükseklik b) Havada kalış süresi c) Yere çarpma hızı nedir?',
        diagramType: 'vertical-throw',
        steps: [
          {
            label: 'a) Çıkış süresi ve atıldığı yerden max yükseklik',
            latex: 'V_{\\text{son}} = V_0 - g t \\implies 0 = 30 - 10 t \\implies t_{\\text{çıkış}} = 3\\,\\text{s}',
            detail: 'Tepe noktasında hız sıfırlanır.',
          },
          {
            label: 'Ek yükselme miktarı',
            latex: 'h = V_0 t - \\frac{1}{2} g t^2 = 30 \\cdot 3 - \\frac{1}{2} \\cdot 10 \\cdot 3^2 = 90 - 45 = 45\\,\\text{m}',
            detail: 'Cisim atıldığı noktadan 45 m daha yukarı çıkar.',
          },
          {
            label: 'b) Toplam yükseklik ve iniş süresi',
            latex: 'H_{\\text{top}} = 80 + 45 = 125\\,\\text{m} \\implies 125 = \\frac{1}{2} \\cdot 10 \\cdot t_{\\text{iniş}}^2 \\implies t_{\\text{iniş}}^2 = 25 \\implies t_{\\text{iniş}} = 5\\,\\text{s}',
            detail: 'Toplam havada kalış süresi t_toplam = t_çıkış + t_iniş = 3 + 5 = 8 s olur.',
          },
          {
            label: 'c) Yere çarpma hızı',
            latex: 'V_{\\text{son}} = 0 + g \\cdot t_{\\text{iniş}} = 10 \\cdot 5 = 50\\,\\text{m/s} \\quad (\\text{veya } V^2 = 2gH = 2 \\cdot 10 \\cdot 125 = 2500 \\implies V = 50\\,\\text{m/s})',
            detail: 'İki farklı formülden de aynı 50 m/s sonucu elde edilir.',
          },
        ],
        result: 'a) h_ek = 45 m (yerden 125 m)  |  b) t_toplam = 8 s  |  c) V_çarpma = 50 m/s',
        examTip: 'PDF Sayfa 8’de 125 = 5·t² işleminden sonra t = √125 = 5 yazılmış; matematiksel olarak 125/5 = 25, √25 = 5 s’dir.',
      },
      {
        id: 'dusme-ex-2',
        sourceLabel: 'PDF Sayfa 7 — Hocanın Örneği',
        title: '45 m Yükseklikten 30° Açıyla Eğik Atılan Cisim',
        question:
          '45 m yükseklikten V = 20 m/s hızla yatayla 30° açı yapacak şekilde yukarı atılan cisim için tepe yüksekliği, uçuş süresi, yatay menzil ve çarpma hızını bulunuz.',
        diagramType: 'oblique-throw',
        steps: [
          {
            label: '1) Hız bileşenleri (hocanın sin30°=0,5 ve cos30°≈0,7 kabulüyle)',
            latex: '\\begin{aligned} V_y &= 20 \\cdot 0{,}5 = 10\\,\\text{m/s} \\\\ V_x &= 20 \\cdot 0{,}7 = 14\\,\\text{m/s} \\end{aligned}',
            detail: 'Not: Gerçek cos30° = √3/2 ≈ 0,866’dır ancak PDF’te 0,7 alınarak Vx = 14 m/s hesaplanmıştır.',
          },
          {
            label: '2) Çıkış süresi ve toplam yükseklik',
            latex: '\\begin{aligned} 0 &= 10 - 10t \\implies t_{\\text{çıkış}} = 1\\,\\text{s} \\\\ h_{\\text{ek}} &= \\frac{1}{2}\\cdot 10 \\cdot 1^2 = 5\\,\\text{m} \\implies H_{\\text{top}} = 45 + 5 = 50\\,\\text{m} \\end{aligned}',
            detail: 'Tepe noktası yerden 50 m yüksekliktedir.',
          },
          {
            label: '3) İniş süresi ve toplam süre',
            latex: '\\begin{aligned} 50 &= 5 t_{\\text{iniş}}^2 \\implies t_{\\text{iniş}} = \\sqrt{10} \\approx 3\\,\\text{s} \\\\ t_{\\text{top}} &= 1 + 3 = 4\\,\\text{s} \\end{aligned}',
            detail: 'Yaklaşık değerle toplam uçuş süresi 4 s alınmıştır.',
          },
          {
            label: '4) Yatay menzil ve yere çarpma hızı',
            latex: '\\begin{aligned} x &= V_x \\cdot t_{\\text{top}} = 14 \\cdot 4 = 56\\,\\text{m} \\\\ V_{y,\\text{son}} &= 10 \\cdot 3 = 30\\,\\text{m/s} \\end{aligned}',
            detail: 'Bileşke çarpma hızı: V = √(14² + 30²) = √1096 ≈ 33,1 m/s (PDF’te yaklaşık 35 m/s yuvarlanmış).',
          },
        ],
        result: 'H_max = 50 m  |  t_top ≈ 4 s  |  x = 56 m  |  V_çarpma ≈ 33,1 – 35 m/s',
      },
      {
        id: 'dusme-ex-3',
        sourceLabel: 'PDF Sayfa 4 — Ek Dairesel Hareket Örneği',
        title: 'Düşey Düzlemde Dönen Cismin Saat 6 Konumunda İp Gerilmesi',
        question:
          'r = 1 m yarıçaplı ipin ucuna bağlı m = 1 kg kütleli cisim v = 30 m/s hızla düşey düzlemde döndürülüyor. Saat 3 konumundan saat 6 (en alt) konumuna geldiğinde ip gerilmesi T kaç N olur?',
        diagramType: 'circular',
        steps: [
          {
            label: '1) Cismin ağırlığı ve merkezcil kuvvet',
            latex: 'G = m \\cdot g = 1 \\cdot 10 = 10\\,\\text{N}, \\qquad F_{\\text{mer}} = \\frac{m \\cdot v^2}{r} = \\frac{1 \\cdot 30^2}{1} = 900\\,\\text{N}',
            detail: 'En alt noktada (saat 6) ağırlık da merkezkaç yönünde (aşağı) etki eder.',
          },
          {
            label: '2) İp gerilmesi T',
            latex: 'T = G + F_{\\text{mer}} = 10 + 900 = 910\\,\\text{N}',
            detail: 'İki kuvvet aynı yönde (aşağı) olduğu için toplanır.',
          },
        ],
        result: 'T = 910 N',
      },
    ],
    keyTakeaways: [
      'Serbest düşmede kütlenin (m) formüllerde sadeleştiğini ve düşme süresini etkilemediğini unutma.',
      'Yukarı atılan cisimde toplam yükseklik = kule yüksekliği + çıkış yüksekliğidir.',
      'Yere çarpma hızı sorulursa V² = 2gH formülü süreyi bulmadan doğrudan sonuç verir.',
    ],
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    topic: 'Ölçü & Birimler',
    question: 'Aşağıdakilerden hangisi SI temel büyüklüklerinden (KISAMUZ) biri olan Akım Şiddetinin birimidir ve vektörel olmayan (skaler) bir büyüklüktür?',
    options: ['Volt (V)', 'Amper (A)', 'Newton (N)', 'Ohm (Ω)'],
    correctIndex: 1,
    explanation: 'KISAMUZ’daki A harfi Akım Şiddetini temsil eder; SI birimi Amper (A)’dir ve skaler büyüklüktür.',
  },
  {
    id: 'q2',
    topic: 'Ölçü & Dönüşüm',
    question: '108 km/h hızla hareket eden bir trenin hızı SI birim sisteminde kaç m/s’dir?',
    options: ['20 m/s', '25 m/s', '30 m/s', '36 m/s'],
    correctIndex: 2,
    explanation: 'km/h’den m/s’ye geçerken 3,6’ya bölünür: 108 / 3,6 = 30 m/s.',
  },
  {
    id: 'q3',
    topic: 'Vektörler',
    question: 'F₁ = 3i − 2j + 4k ve F₂ = −i + 5j − 2k vektörleri veriliyor. F₁ − F₂ vektörü aşağıdakilerden hangisidir?',
    options: ['2i + 3j + 2k', '4i − 7j + 6k', '4i + 3j + 2k', '2i − 7j + 6k'],
    correctIndex: 1,
    explanation: 'F₁ − F₂ = (3 − (−1))i + (−2 − 5)j + (4 − (−2))k = 4i − 7j + 6k.',
  },
  {
    id: 'q4',
    topic: 'Vektörler (Bileşen)',
    question: 'Yatayla 53° açı yapan 25 N büyüklüğündeki bir kuvvetin yatay (Fx) ve düşey (Fy) bileşenleri sırasıyla kaç N’dur? (sin53° = 0,8; cos53° = 0,6)',
    options: ['Fx = 20 N, Fy = 15 N', 'Fx = 15 N, Fy = 20 N', 'Fx = 12 N, Fy = 16 N', 'Fx = 16 N, Fy = 12 N'],
    correctIndex: 1,
    explanation: 'Fx = 25 · cos53° = 25 · 0,6 = 15 N; Fy = 25 · sin53° = 25 · 0,8 = 20 N.',
  },
  {
    id: 'q5',
    topic: 'Ortalama Hız & Sürat',
    question: 'Bir araç x = 10 m noktasından önce x = 40 m’ye gidip, ardından geri dönerek x = −20 m noktasına toplam 20 saniyede ulaşıyor. Aracın ortalama hızı ve ortalama sürati nedir?',
    options: [
      'Ortalama hız: −1,5 m/s, Sürat: 4,5 m/s',
      'Ortalama hız: 4,5 m/s, Sürat: 1,5 m/s',
      'Ortalama hız: −1,5 m/s, Sürat: 1,5 m/s',
      'Ortalama hız: −3,0 m/s, Sürat: 3,0 m/s',
    ],
    correctIndex: 0,
    explanation: 'Yer değiştirme Δx = −20 − 10 = −30 m ⇒ V_ort = −30/20 = −1,5 m/s. Toplam yol = 30 + 60 = 90 m ⇒ Sürat = 90/20 = 4,5 m/s.',
  },
  {
    id: 'q6',
    topic: 'Anlık Hız (Türev)',
    question: 'Konum denklemi x(t) = 3t² − 6t + 4 olan bir cismin t = 2 s anındaki anlık hızı kaç m/s’dir?',
    options: ['0 m/s', '4 m/s', '6 m/s', '12 m/s'],
    correctIndex: 2,
    explanation: 'v(t) = dx/dt = 6t − 6. t = 2 s için v(2) = 6(2) − 6 = 6 m/s.',
  },
  {
    id: 'q7',
    topic: 'Sabit İvmeli Hareket',
    question: 'İlk hızı 8 m/s olan bir araç sabit 4 m/s² ivmeyle 5 saniye hızlanırsa son hızı ve bu sürede aldığı yol kaç metre olur?',
    options: ['Vs = 28 m/s, x = 90 m', 'Vs = 20 m/s, x = 70 m', 'Vs = 28 m/s, x = 75 m', 'Vs = 32 m/s, x = 100 m'],
    correctIndex: 0,
    explanation: 'Vs = 8 + 4·5 = 28 m/s. Yol x = 8·5 + ½·4·5² = 40 + 50 = 90 m.',
  },
  {
    id: 'q8',
    topic: 'Serbest Düşme',
    question: '45 m yükseklikten ilk hızsız serbest bırakılan bir taş yere kaç saniyede ve hangi hızla çarpar? (g = 10 m/s²)',
    options: ['3 s ve 30 m/s', '4 s ve 40 m/s', '3 s ve 45 m/s', '5 s ve 50 m/s'],
    correctIndex: 0,
    explanation: 'h = ½gt² ⇒ 45 = 5t² ⇒ t² = 9 ⇒ t = 3 s. Çarpma hızı Vs = g·t = 10·3 = 30 m/s.',
  },
];
