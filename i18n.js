import i18n from 'i18next';

// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector


i18n.init({
    lng: 'kk',
    debug: false,
    compatibilityJSON: 'v3',
    resources: {
        'ru': {
            translation: {
                home: {
                    home_title: 'Главная',
                    to_main_page: 'На главную'
                },

                dashboard: {
                    title: 'Мой личный кабинет'
                },

                misc: {
                    yes: 'Да',
                    no: 'Нет',
                    accepted: 'Принято',
                    all: 'Все',
                    continue: 'Продолжить',
                    created_at: 'Дата и время создания',
                    for_business: 'Для бизнеса',
                    applications: 'Заявки',
                    no_applications: 'Здесь пока нет заявок',
                    address: 'Адрес',
                    street: 'Улица',
                    house: '№ здания, дома'
                },

                auth: {
                    account_settings: 'Настройки аккаунта',
                    sign_in_title: 'Вход в личный кабинет',
                    sign_in: 'Войти',
                    sign_out: 'Выйти из аккаунта',
                    sign_up_title: 'Регистрация пользователя',
                    sign_up: 'Регистрация',
                    sign_up_finish: 'Завершить регистрацию',
                    password_login_title: 'Вход по паролю',
                    phone: 'Номер телефона',
                    phone_additional: 'Дополнительный номер телефона',
                    email: 'Эл.почта',
                    creating_a_password: 'Создание пароля',
                    password_tutorial: 'Для защиты ваших данных вам необходимо придумать безопасный пароль.',
                    password: 'Пароль',
                    password_confirmation: 'Подтвердите пароль',
                    forgot_password: 'Забыли пароль?',
                    password_reset: 'Сбросить',
                    password_recovery: 'Восстановление пароля',
                    activation: 'SMS Активация аккаунта',
                    sms_code: 'SMS код',
                    enter_the_sms_code: 'На номер {{phone}} был отправлен SMS с 4-х значным кодом подтверждения. Введите его в поле ниже:'
                },

                user: {
                    first_name: 'Имя',
                    last_name: 'Фамилия',
                    iin: 'ИИН',
                    email: 'Эл.почта',
                    city: 'Город',
                    choose_a_city: 'Выберите город',
                    current_mode: 'Текущий режим',
                    user_info: 'Информация о пользователе'
                },

                settings: {
                    settings_title: 'Настройки приложения',
                    app_language: 'Язык приложения',
                    app_theme: 'Цветовая тема',
                    themes: {
                        light: 'Светлая',
                        dark: 'Темная'
                    }
                },

                errors: {
                    network_error: 'Ошибка соединения с сервером. Проверьте подключение к интернету',
                    not_logged_in: 'Вы не авторизованы'
                },

                scanner: {
                    title: 'Сканер QR кода',
                    scan_the_qr_code: 'Сканируйте QR-код',
                    please_wait: 'Пожалуйста подождите, идет сканирование QR-кода...',
                    requesting_permission: 'Идет запрос для получения доступа к камере.',
                    no_access_to_camera: 'Нет доступа к камере. Для продолжения вы должны предоставить доступ к камере через настройки вашего устройства в разделе "Приложения".'
                },

                bonuses: 'Бонусы',
                bonus: 'Бонус',

                categories: {
                    title: 'Категории',
                    services: 'Услуги',
                    products: 'Товары'
                },

                partners_and_managers: 'Партнёры и менеджеры',
                organizations_branches_staff: 'Организации, филиалы и персонал',

                partners: {
                    title: 'Партнёры',
                    partner_info: 'Информация о партнёре',
                    application: 'Заявка на партнёрство',
                    no_partners: 'Здесь пока нет партнёров',
                    become_a_partner: 'Стать партнёром',
                    become_a_partner_offer: 'Станьте нашим партнёром и повышайте свои продажи',
                    application_accepted_title: 'Спасибо, ваша заявка принята!',
                    application_accepted_description: 'В ближайшее время наш менеджер свяжется с Вами для уточнения необходимой информации.',
                    partner_name: 'Название организации',
                    partner_org_name: 'Полное наименование организации',
                    partner_org_name_placeholder: 'Пример ТОО "Наименование организации"',
                    bin: 'БИН',
                    applicant: 'Заявитель',
                    operator: 'Оператор',
                    manager: 'Менеджер',
                    submit_application: 'Подать заявку',
                    accept_application: 'Принять заявку',
                    accept_application_confirm: 'Вы дейтствительно хотите принять данную заявку?'
                },

                managers: {
                    title: 'Менеджеры',
                    application: 'Заявка на должность менеджера',
                    become_a_manager: 'Стать менеджером',
                    no_managers: 'Здесь пока нет менеджеров',
                },

                organizations: {
                    title: 'Организации',
                    my_organizations: 'Мои организации',
                    organization_info: 'Информация об организации'
                },

                branches: {
                    title: 'Филиалы',
                    organization_branches: 'Филиалы организации',
                    no_branches: 'Нет добавленных филиалов',
                    add_a_branch: 'Добавить филиал',
                    attention_1: 'Местоположение Вашего филиала автоматически была определена Вашим текущим местоположением. Чтобы изменить его, перетащите маркер на необходимое место либо кликните по необходимому месту на карте',
                    attention_2: 'Вы выбрали город "{{city}}". Укажите точное местоположение Вашего филиала перетащив маркер либо кликнув по необходимому месту на карте'
                },

                staff: {
                    title: 'Персонал'
                },

                services: {
                    title: 'Услуги'
                }
            }
        },
        'kk': {
            translation: {
                home: {
                    home_title: 'Басты бет',
                    to_main_page: 'Басты бетке'
                },
                dashboard: {
                    title: 'Менің жеке кабинетім'
                },
                misc: {
                    yes: 'Иә',
                    no: 'Жоқ',
                    accepted: 'Түсінікті',
                    all: 'Барлығы',
                    continue: 'Жалғастыру',
                    created_at: 'Тіркелген уақыты',
                    for_business: 'Бизнеске',
                    applications: 'Өтінімдер',
                    no_applications: 'Мында әзірше өтінімдер жоқ',
                    address: 'Мекен-жайы',
                    street: 'Көше',
                    house: 'Үй, ғимарат нөмірі'
                },
                auth: {
                    account_settings: 'Аккаунттың баптамалары',
                    sign_in_title: 'Жеке кабинетке кіру',
                    sign_in: 'Кіру',
                    sign_out: 'Аккаунттан шығу',
                    sign_up_title: 'Қолданушыны тіркеу',
                    sign_up: 'Тіркелу',
                    sign_up_finish: 'Тіркелуді тәмәмдау',
                    password_login_title: 'Құпия сөз арқылы кіру',
                    phone: 'Телефон нөмірі',
                    phone_additional: 'Қосымша телефон нөмірі',
                    email: 'Эл.пошта',
                    creating_a_password: 'Құпия сөз ойлап табу',
                    password_tutorial: 'Деректерді қорғау үшін сізге қауіпсіз құпия сөз ойлап табу керек.',
                    password: 'Құпия сөз',
                    password_confirmation: 'Құпия сөзді растаңыз',
                    forgot_password: 'Құпия сөзді ұмытып қалдыңыз ба?',
                    password_reset: 'Қалпына келтіру',
                    password_recovery: 'Құпия сөзді қайта қалпына келтіру',
                    activation: 'Аккаунтты sms арқылы белсендіру',
                    sms_code: 'SMS код',
                    enter_the_sms_code: '{{phone}} нөміріне 4 санды растау коды бар SMS жібердік. Оны төмендегі жолаққа енгізіңіз:'
                },

                user: {
                    first_name: 'Аты',
                    last_name: 'Тегі',
                    iin: 'ЖСН',
                    email: 'Эл.пошта',
                    city: 'Қала',
                    choose_a_city: 'Қаланы таңдаңыз',
                    current_mode: 'Ағымдағы режим',
                    user_info: 'Қолданушы туралы деректер'
                },

                settings: {
                    settings_title: 'Қосымшаның баптаулары',
                    app_language: 'Қосымшаның тілі',
                    app_theme: 'Түс тақырыбы',
                    themes: {
                        light: 'Жарық',
                        dark: 'Қараңғы'
                    }
                },

                errors: {
                    network_error: 'Серверге қосылу қатесі. Интернет байланысын тексеріңіз',
                    not_logged_in: 'Сіз авторизация өткен жоқсыз'
                },

                scanner: {
                    title: 'QR код сканері',
                    scan_the_qr_code: 'QR-кодты сканерлеңіз',
                    please_wait: 'Күте тұрыңыз, QR-кодты сканерлеу жүріп жатыр...',
                    requesting_permission: 'Камераны қосуға қолжетімділік сұралуда.',
                    no_access_to_camera: 'Камераны қосу қолжетімсіз. Жалғастыру үшін сіз құрылғыңыздың баптауларындағы "Қосымшалар" бөлімі арқылы камераға кіруге рұқсат беруіңіз керек.'
                },

                bonuses: 'Бонустар',
                bonus: 'Бонус',

                categories: {
                    title: 'Санаттар',
                    services: 'Қызметтер',
                    products: 'Тауарлар'
                },

                partners_and_managers: 'Серіктестер және менеджерлер',
                organizations_branches_staff: 'Ұйымдар, бөлімшелер және қызметкерлер',

                partners: {
                    title: 'Серіктестер',
                    partner_info: 'Серіктес туралы деректер',
                    application: 'Серіктестікке өтінім',
                    no_partners: 'Мында әзірше серіктестер жоқ',
                    become_a_partner: 'Серіктес болу',
                    become_a_partner_offer: 'Біздің серіктес болыңыз және сатылымыңызды арттырыңыз',
                    application_accepted_title: 'Рахмет, сіздің өтініміңіз қабылданды!',
                    application_accepted_description: 'Жақын арада біздің менеджер қажетті ақпаратты нақтылау үшін сізбен байланысады.',
                    partner_name: 'Ұйымның атауы',
                    partner_org_name: 'Ұйымның толық атауы',
                    partner_org_name_placeholder: 'Мысалы ЖШС "Ұйымның атауы"',
                    bin: 'БСН',
                    applicant: 'Өтінім беруші',
                    operator: 'Оператор',
                    manager: 'Менеджер',
                    submit_application: 'Өтінім беру',
                    accept_application: 'Өтінімді қабылдау',
                    accept_application_confirm: 'Сіз расыменде осы өтінімді қабылдағыңыз келеді ме?'
                },

                managers: {
                    title: 'Менеджерлер',
                    application: 'Менеджер болуға өтінім',
                    become_a_manager: 'Менеджер болу',
                    no_managers: 'Мында әзірше менеджерлер жоқ',
                },

                organizations: {
                    title: 'Ұйымдар',
                    my_organizations: 'Менің ұйымдарым',
                    organization_info: 'Ұйым туралы деректер',
                },

                branches: {
                    title: 'Бөлімшелер',
                    organization_branches: 'Ұйымның бөлімшелері',
                    no_branches: 'Қосылған бөлімшелер жоқ',
                    add_a_branch: 'Бөлімше қосу',
                    attention_1: 'Сіздің бөлімшеңіздің орналасқан жері автоматты түрде сіздің орналасқан жеріңізбен анықталды. Оны өзгерту үшін маркерді қажетті жерге сүйреңіз немесе картадағы қажетті орынды басыңыз',
                    attention_2: 'Сіз {{city}} қаласын таңдадыңыз. Маркерді сүйреп апару немесе картадағы қажетті орынды басу арқылы бөлімшенің нақты орнын көрсетіңіз'
                },

                staff: {
                    title: 'Қызметкерлер'
                },

                services: {
                    title: 'Қызметтер'
                }
            }
        },
        // have an initial namespace
        ns: ['translation'],
        supportedLangs: [  // Supported languages
            {
                code: 'ru',
                locale: 'Русский',
                flag: 'ru.png'
            },
            {
                code: 'kk',
                locale: 'Қазақша',
                flag: 'kk.png'
            }
        ],
        defaultNS: 'translation',
        interpolation: {
            escapeValue: false // not needed for react
        }
    }
})
export default i18n;