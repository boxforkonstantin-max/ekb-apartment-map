export const checkedAt = "18 ноября 2026";
export const budget = 9_500_000;

export const developers = {
  brusnika: {
    name: "Брусника",
    scope: "МСФО группы, 2025",
    metrics: ["Выручка 115,6 млрд ₽", "EBITDA 44,4 млрд ₽", "Прибыль 7,6 млрд ₽", "Net debt / EBITDA 3,9x"],
    conclusion: "Общая долговая нагрузка высокая; корпоративный показатель без основной части проектного финансирования — 0,6x. АКРА: A-(RU), негативный прогноз.",
    source: "https://tyumen.brusnika.ru/news/rezultaty-2025-msfo"
  },
  forum: {
    name: "Forum Group",
    scope: "РСБУ АО «ФОРУМ-ГРУПП», 2025",
    metrics: ["Выручка 5,069 млрд ₽", "Прибыль 0,768 млрд ₽", "Кредиторская задолженность 1,01 млрд ₽"],
    conclusion: "Головное юрлицо прибыльно, но консолидированный процентный долг группы и проектных SPV публично не раскрыт.",
    source: "https://www.tbank.ru/business/contractor/legal/1076671035616/"
  },
  unistroy: {
    name: "G-Group / Унистрой",
    scope: "МСФО группы, 2025; данные компании в СМИ",
    metrics: ["Выручка 44 млрд ₽", "Прибыль 2,4 млрд ₽", "Консолидированный долг не раскрыт"],
    conclusion: "Отдельная управляющая компания показала убыток, поэтому её РСБУ нельзя переносить на всю группу.",
    source: "https://kazanfirst.ru/articles/boginya-etruskov-ne-spasla-unistroj-zastrojshhiku-otkazali-v-registraczii-tovarnogo-znaka?noamp=mobile"
  },
  razum: {
    name: "РАЗУМ",
    scope: "Открытой консолидации группы нет",
    metrics: ["Проекты ведут отдельные SPV", "Общий оборот не раскрыт", "Общий долг не раскрыт"],
    conclusion: "Финансовую нагрузку группы количественно сопоставить с публичными девелоперами нельзя — это отдельный фактор неопределённости.",
    source: "https://ekaterinburg.razum.life/documents/"
  },
  stroytek: {
    name: "Стройтэк",
    scope: "РСБУ АО СК «СТРОЙТЭК», 2025",
    metrics: ["Выручка 6,019 млрд ₽", "Прибыль 0,439 млрд ₽", "Кредиторская задолженность 0,692 млрд ₽"],
    conclusion: "Юрлицо прибыльно; данных для расчёта консолидированного Net debt / EBITDA группы нет.",
    source: "https://companies.rbc.ru/id/1036603490109-ao-stroitelnaya-kompaniya-strojtek/"
  },
  sinitsa: {
    name: "Синица Девелопмент",
    scope: "РСБУ ООО, 2025",
    metrics: ["Выручка 0,216 млрд ₽", "Убыток 0,049 млрд ₽", "Активы 0,411 млрд ₽", "Кредиторская задолженность 0,094 млрд ₽"],
    conclusion: "Компания зарегистрирована в 2024 году; один полный год отчётности и убыток означают повышенную неопределённость.",
    source: "https://www.audit-it.ru/contragent/1246600039729_ooo-sinitsa-development"
  },
  sinara: {
    name: "Синара–Девелопмент",
    scope: "МСФО девелоперского контура, 6 месяцев 2025",
    metrics: ["EBITDA 2,354 млрд ₽", "Кредиты 8,772 млрд ₽", "Эскроу 10,123 млрд ₽", "Чистый долг −3,770 млрд ₽"],
    conclusion: "Отрицательный чистый долг получается после вычета эскроу; без него долговая картина тяжелее. АКРА: A(RU), негативный прогноз.",
    source: "https://sinara-development.ru/upload/iblock/4ee/tyorcp80efqaavm079q40w9uxo6tp9v7/SDF-MSFO-6-mes-2025.pdf"
  },
  lsr: {
    name: "ЛСР",
    scope: "МСФО публичной группы, 2025",
    metrics: ["Выручка 252,1 млрд ₽", "EBITDA 68,4 млрд ₽", "Прибыль 10,8 млрд ₽", "Net debt / EBITDA 1,7x"],
    conclusion: "Масштаб большой и коэффициент долга умеренный, но прибыль снизилась, а запас покрытия процентов не широкий.",
    source: "https://www.e-disclosure.ru/portal/files.aspx?id=4834&type=4"
  }
};

export const projects = [
  { id: "forum", name: "Forum Park", developer: "forum", lat: 56.8104, lng: 60.5462, distance: 4.38, confirmed: true },
  { id: "park", name: "Парковый квартал 2.0", developer: "unistroy", lat: 56.8139, lng: 60.6271, distance: 3.22, confirmed: true },
  { id: "razum", name: "РАЗУМ на Малышева", developer: "razum", lat: 56.8355, lng: 60.6410, distance: 2.68, confirmed: true },
  { id: "dinamika", name: "Динамика", developer: "stroytek", lat: 56.8427, lng: 60.6666, distance: 4.24, confirmed: true },
  { id: "sinitsa", name: "Синица на Куйбышева", developer: "sinitsa", lat: 56.8253, lng: 60.6545, distance: 3.75, confirmed: true },
  { id: "south", name: "Южные кварталы", developer: "brusnika", lat: 56.8112, lng: 60.5797, distance: 3.16, confirmed: true },
  { id: "quiet", name: "Тихий центр", developer: "sinara", lat: 56.8552, lng: 60.5786, distance: 2.23, confirmed: false },
  { id: "azina", name: "Азина, 16", developer: "lsr", lat: 56.8550, lng: 60.6135, distance: 2.14, confirmed: false }
];

export const apartments = [
  { id:"forum-3109", project:"forum", type:"Студийная 1-комн.", area:30.91, floor:11, finish:"Чистовая", price:5610771, deadline:"IV кв. 2028", status:"confirmed", image:"assets/plans/forum-studio.webp", official:"https://forum-gd.ru/complexes/forum-park/flats/forum-park.-sektsiia-3-1-komnatnaya-kvartira-30.91m-3-109", number:"№3.109", note:"Минимальная цена в коротком списке. Спальная зона не отделена." },
  { id:"forum-3280", project:"forum", type:"1-комнатная", area:40.84, floor:24, finish:"Чистовая", price:7324527, deadline:"IV кв. 2028", status:"confirmed", image:"assets/plans/forum-1br.webp", official:"https://forum-gd.ru/complexes/forum-park/flats/forum-park.-sektsiia-3-1-komnatnaya-kvartira-40.84m-3-280", number:"№3.280", note:"Отдельная спальня и низкая цена за квадратный метр." },
  { id:"park-277", project:"park", type:"Студия", area:31.80, floor:2, finish:"Не подтверждена", price:7054000, deadline:"I кв. 2029", status:"confirmed", image:null, official:"https://unistroy.ru/ekb/search/placement/39751", number:"№277", note:"Цена одинакова для ипотеки и полной оплаты. Сервер планировок Унистроя запрещает публикационную загрузку — план доступен в официальной карточке." },
  { id:"park-573", project:"park", type:"Евро-2", area:37.30, floor:27, finish:"Не подтверждена", price:8332000, deadline:"I кв. 2029", status:"confirmed", image:null, official:"https://unistroy.ru/ekb/search/placement/40503", number:"№573", note:"Отдельная спальня; высокий этаж и поздний срок. Сервер планировок Унистроя запрещает публикационную загрузку — план доступен в официальной карточке." },
  { id:"razum-2413", project:"razum", type:"Студия", area:32.80, floor:4, finish:"Состав уточнить", price:6925600, deadline:"IV кв. 2029", status:"confirmed", image:"assets/plans/razum-studio.webp", official:"https://ekaterinburg.razum.life/flats/6843", number:"№2.4.13", note:"Есть гардеробная; скидка 12% требует фиксации." },
  { id:"razum-269", project:"razum", type:"1-комнатная", area:43.62, floor:6, finish:"Состав уточнить", price:7812000, deadline:"IV кв. 2029", status:"confirmed", image:null, official:"https://ekaterinburg.razum.life/flats/6801", number:"№2.6.9", note:"Максимальная площадь в строгом бюджете." },
  { id:"dinamika-25", project:"dinamika", type:"Евро-2", area:35.68, floor:5, finish:"Комфорт+", price:7234905, deadline:"III кв. 2028", status:"confirmed", image:"assets/plans/dinamika-euro2.webp", official:"https://stroytek-ek.ru/flat/4559/", number:"№25", note:"Первая очередь проекта уже введена." },
  { id:"dinamika-23", project:"dinamika", type:"1-комнатная", area:40.25, floor:5, finish:"Комфорт+", price:7025838, deadline:"Передача уточняется", status:"related", image:null, official:"https://stroytek-ek.ru/flat/1641", number:"№23", note:"Похожее предложение в введённом доме; наличие перепроверить." },
  { id:"sinitsa-140", project:"sinitsa", type:"Студия", area:30.02, floor:14, finish:"Чистовая", price:7100300, deadline:"II кв. 2028", status:"confirmed", image:null, official:"https://sinitca.com/kvartiry-s-chistovoj-otdelkoj", number:"№140", note:"В цене учтена доплата за отделку 450 300 ₽." },
  { id:"sinitsa-37", project:"sinitsa", type:"1-комнатная", area:34.85, floor:4, finish:"Чистовая", price:8062750, deadline:"II кв. 2028", status:"confirmed", image:"assets/plans/sinitsa-1br.png", official:"https://sinitca.com/kvartiry-s-chistovoj-otdelkoj#flat-9196244", number:"№37", note:"В цене учтена доплата за отделку 522 750 ₽." },
  { id:"sinitsa-840", project:"sinitsa", type:"1-комнатная", area:35.35, floor:14, finish:"Чистовая", price:8410250, deadline:"II кв. 2028", status:"confirmed", image:null, official:"https://sinitca.com/kvartiry-s-chistovoj-otdelkoj", number:"№840", note:"В цене учтена доплата за отделку 530 250 ₽." },
  { id:"south-35", project:"south", type:"Студия", area:32.20, floor:6, finish:"Предчистовая", price:7340000, deadline:"I кв. 2028", status:"confirmed", image:"assets/plans/south-studio.svg", official:"https://ekaterinburg.brusnika.ru/flat/66728/", number:"№35", note:"Скидка 10%; базовая цена 8,19 млн ₽. Финишный ремонт оплачивается отдельно." },
  { id:"quiet-studio", project:"quiet", type:"Студия", area:31.00, floor:null, finish:"Чистовая", price:8110000, deadline:"IV кв. 2027/2028", status:"estimate", image:null, official:"https://sinara-development.ru/objects/residential-complexes/tikhiy-tsentr/", number:"Лот не открыт", note:"Цена — ориентир агрегатора; прямой лот не подтверждён." },
  { id:"quiet-1br", project:"quiet", type:"1-комнатная", area:36.20, floor:null, finish:"Чистовая", price:9400000, deadline:"IV кв. 2027/2028", status:"estimate", image:null, official:"https://sinara-development.ru/objects/residential-complexes/tikhiy-tsentr/", number:"Лот не открыт", note:"Цена — ориентир агрегатора; прямой лот не подтверждён." },
  { id:"azina-1br", project:"azina", type:"1-комнатная", area:36.20, floor:null, finish:"Чистовая / предчистовая с/у", price:8100000, deadline:"Уточнить", status:"estimate", image:null, official:"https://azina16.lsr.ru/", number:"Лот не открыт", note:"Проект и отделка подтверждены, цена конкретного лота — нет." }
];

