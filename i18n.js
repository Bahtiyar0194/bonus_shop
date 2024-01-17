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

                news: {
                    title: 'Новости'
                },

                contests: {
                    title: 'Конкурсы'
                },

                questions: {
                    title: 'Вопросы'
                },

                dashboard: {
                    title: 'Мой личный кабинет'
                },

                misc: {
                    yes: 'Да',
                    no: 'Нет',
                    accepted: 'Принято',
                    done: 'Готово',
                    select_all: 'Выбрать все',
                    to_publish: 'Опубликовать',
                    all: 'Все',
                    continue: 'Продолжить',
                    select: 'Выбрать',
                    created_at: 'Дата и время создания',
                    for_business: 'Для бизнеса',
                    applications: 'Заявки',
                    no_applications: 'Здесь пока нет заявок',
                    address: 'Адрес',
                    street: 'Улица',
                    house: '№ здания, дома',
                    work_regulations: 'Регламент работы',
                    around_the_clock: 'Круглосуточно',
                    weekend: 'Выходной',
                    working_day: 'Рабочий день',
                    select_photos: 'Выбрать фотографии',
                    selected_photos_count: 'Выбрано {{number}} фото из {{max_number}}',
                    select_branch_photos: 'Выберите фотографии филиала',
                    submit_for_review: 'Отправить на проверку',
                    on_inspection: 'На проверке',
                    go_back: 'Назад',
                    search: 'Поиск',
                    call: 'Позвонить',
                    contact_details: 'Контактные данные',
                    your_referral_link: 'Ваша реферальная ссылка',
                    copied_to_clipboard: 'Скопировано в буфер обмена'
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
                    enter_the_sms_code: 'На номер {{phone}} был отправлен SMS с 6 значным кодом подтверждения. Введите его в поле ниже:'
                },

                user: {
                    first_name: 'Имя',
                    last_name: 'Фамилия',
                    iin: 'ИИН',
                    email: 'Эл.почта',
                    city: 'Город',
                    address: 'Адрес',
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
                    no_access_to_camera: 'Нет доступа к камере. Для продолжения вы должны предоставить доступ к камере через настройки вашего устройства в разделе "Приложения".',
                    expired_title: 'Время ожидания истекло',
                    expired_description: 'Срок действия страницы истек из за неактивности. Пожалуйста, обновите страницу и попробуйте еще раз'
                },

                bonuses: {
                    title: 'Бонусы',
                    bonus_description: 'Бонусы для использования у VIP партнёров, из расчета 10% личных бонусов, 90% реферальных бонусов.',
                    personal_bonus: 'Личный бонус',
                    personal_bonus_description: 'Бонусы от Ваших личных покупок.',
                    referral_bonus: 'Реферальный бонус',
                    referral_bonus_description: 'Бонусы полученные от сети до пятого поколения от прямых приглашении.',
                    manager_bonus: 'Бонус менеджера',
                    manager_bonus_description: 'Бонусы от каждой продажи у лично приглашенных партнёров. Бонусы можно снимать на карту.',
                    number_of_invited_clients: 'Приглашено клиентов',
                    invited_clients_description: 'Клиенты, приглашенные по личной реферaльной ссылке до пятого поколения.',
                    number_of_invited_partners: 'Приглашено партнёров',
                    invited_partners_description: 'Партнёры, лично приглашенные.',
                    bonus: 'Бонус',
                },

                categories: {
                    title: 'Категории',
                    category: 'Категория',
                    choose_a_category: 'Выберите категорию',
                    services_and_products: 'Услуги и товары',
                    my_services: 'Мои услуги',
                    services: 'Услуги',
                    no_services: 'Нет добавленных услуг',
                    no_inspect_services: 'Нет услуг на проверку',
                    add_a_service: 'Добавить услугу',
                    service_is_available_in: 'В каких филиалах доступна данная услуга?', 
                    service_title: 'Название услуги',
                    service_description: 'Описание услуги',
                    products: 'Товары'
                },

                partners_and_managers: 'Партнёры и менеджеры',
                organizations_branches_staff: 'Организации, филиалы и персонал',
                operations_title: 'Операции',

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
                    accept_application_confirm: 'Вы дейтствительно хотите принять данную заявку?',
                    search_title: 'Услуги | Товары | Партнёры'
                },

                managers: {
                    title: 'Менеджеры',
                    application: 'Заявка на должность менеджера',
                    become_a_manager: 'Стать менеджером',
                    no_managers: 'Здесь пока нет менеджеров',
                },

                organizations: {
                    title: 'Организации',
                    organization: 'Организация',
                    my_organizations: 'Мои организации',
                    organization_info: 'Информация об организации',
                    choose_an_organization: 'Выберите организацию'
                },

                branches: {
                    title: 'Филиалы',
                    organization_branches: 'Филиалы организации',
                    no_branches: 'Нет добавленных филиалов',
                    no_inspect_branches: 'Нет филиалов на проверку',
                    add_a_branch: 'Добавить филиал',
                    choose_a_branch: 'Выберите филиал',
                    attention_1: 'Местоположение Вашего филиала автоматически была определена Вашим текущим местоположением. Чтобы изменить его, перетащите маркер на необходимое место либо кликните по необходимому месту на карте',
                    attention_2: 'Вы выбрали город {{city}}. Укажите точное местоположение Вашего филиала перетащив маркер либо кликнув по необходимому месту на карте',
                    found_objects: 'Нашлось объектов: {{count}}'
                },

                staff: {
                    title: 'Персонал'
                },

                services: {
                    title: 'Услуги'
                },

                operations: {
                    title: 'Все операции',
                    new_operation: 'Новая операция',
                    enter_the_amount: 'Введите сумму',
                    success_title: 'Спасибо! Платёж успешно принят',
                    success_description: 'Ваш платёж успешно принят и отправлен на обработку'
                },

                stock: {
                    title: 'Акция',
                    create: 'Создание новой акции',
                    coverage: 'Охват',
                    select_coverage: 'Выберите охват'
                },

                location: {
                    your_location_is: 'Ваше текущее местоположение {{city}}?',
                    current_location: 'Текущее местоположение',
                    choose_your_location: 'Выберите ваше текущее местоположение',
                    choose_another_city: 'Выбрать другой город',
                    build_a_route: 'Построить маршрут'
                }
            }
        },

        'kk': {
            translation: {
                home: {
                    home_title: 'Басты бет',
                    to_main_page: 'Басты бетке'
                },

                news: {
                    title: 'Жаңалықтар'
                },

                contests: {
                    title: 'Конкурстар'
                },

                questions: {
                    title: 'Сұрақтар'
                },

                dashboard: {
                    title: 'Менің жеке кабинетім'
                },
                misc: {
                    yes: 'Иә',
                    no: 'Жоқ',
                    accepted: 'Түсінікті',
                    done: 'Дайын',
                    select_all: 'Барлығын таңдау',
                    to_publish: 'Жариялау',
                    all: 'Барлығы',
                    continue: 'Жалғастыру',
                    select: 'Таңдау',
                    created_at: 'Тіркелген уақыты',
                    for_business: 'Бизнеске',
                    applications: 'Өтінімдер',
                    no_applications: 'Мында әзірше өтінімдер жоқ',
                    address: 'Мекен-жайы',
                    street: 'Көше',
                    house: 'Үй, ғимарат нөмірі',
                    work_regulations: 'Жұмыс тәртібі',
                    around_the_clock: 'Тәулік бойы',
                    weekend: 'Демалыс',
                    working_day: 'Жұмыс күні',
                    selected_photos_count: 'Тандалған фотолар саны {{number}} / {{max_number}}',
                    select_branch_photos: 'Бөлімшенің фотоларын таңдаңыз',
                    submit_for_review: 'Тексеруге жіберу',
                    on_inspection: 'Тексерісте',
                    go_back: 'Артқа',
                    search: 'Іздеу',
                    call: 'Қоңырау шалу',
                    contact_details: 'Байланыс деректері',
                    your_referral_link: 'Сіздің рефералды сілтемеңіз',
                    copied_to_clipboard: 'Буферге көшірілді'
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
                    enter_the_sms_code: '{{phone}} нөміріне 6 санды растау коды бар SMS жібердік. Оны төмендегі жолаққа енгізіңіз:'
                },

                user: {
                    first_name: 'Аты',
                    last_name: 'Тегі',
                    iin: 'ЖСН',
                    email: 'Эл.пошта',
                    city: 'Қала',
                    address: 'Мекен-жайы',
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
                    no_access_to_camera: 'Камераны қосу қолжетімсіз. Жалғастыру үшін сіз құрылғыңыздың баптауларындағы "Қосымшалар" бөлімі арқылы камераға кіруге рұқсат беруіңіз керек.',
                    expired_title: 'Күту уақыты аяқталды',
                    expired_description: 'Беттің жарамдылық мерзімі әрекетсіздікке байланысты аяқталды. Бетті жаңартып, қайталап көруіңізді өтінеміз'
                },

                bonuses: {
                    title: 'Бонустар',
                    bonus_description: 'VIP серіктестерде пайдалануға арналған бонустар, 10% жеке бонустар, 90% жолдама бонустары есебінен.',
                    personal_bonus: 'Жеке бонус',
                    personal_bonus_description: 'Жеке сатып алуларыңыздан бонустар.',
                    referral_bonus: 'Рефералды бонус',
                    referral_bonus_description: 'Тікелей шақырудан желіден бесінші буынға дейінгі бонустар.',
                    manager_bonus: 'Менеджер бонусы',
                    manager_bonus_description: 'Жеке шақырылған серіктестердің әр сатылымынан түскен бонустар. Бонустарды картаға түсіріп алуға болады.',
                    number_of_invited_clients: 'Шақырылған клиенттер саны',
                    invited_clients_description: 'Бесінші буынға дейін жеке сілтеме бойынша шақырылған клиенттер.',
                    number_of_invited_partners: 'Шақырылған серіктестер саны',
                    invited_partners_description: 'Жеке шақырылған серіктестер.',
                    bonus: 'Бонус',
                },

                categories: {
                    title: 'Санаттар',
                    category: 'Санат',
                    choose_a_category: 'Санатты таңдаңыз',
                    services_and_products: 'Қызметтер және тауарлар',
                    my_services: 'Менің қызметтерім',
                    services: 'Қызметтер',
                    no_services: 'Қосылған қызметтер жоқ',
                    no_inspect_services: 'Тексеруге берілген қызметтер жоқ',
                    add_a_service: 'Қызмет қосу',
                    service_is_available_in: 'Бұл қызмет қай бөлімшелерде қол жетімді?', 
                    service_title: 'Қызметтің атауы',
                    service_description: 'Қызметтің сипаттамасы',
                    products: 'Тауарлар'
                },

                partners_and_managers: 'Серіктестер және менеджерлер',
                organizations_branches_staff: 'Ұйымдар, бөлімшелер және қызметкерлер',
                operations_title: 'Операциялар',

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
                    accept_application_confirm: 'Сіз расыменде осы өтінімді қабылдағыңыз келеді ме?',
                    search_title: 'Қызметтер | Тауарлар | Серіктестер'
                },

                managers: {
                    title: 'Менеджерлер',
                    application: 'Менеджер болуға өтінім',
                    become_a_manager: 'Менеджер болу',
                    no_managers: 'Мында әзірше менеджерлер жоқ',
                },

                organizations: {
                    title: 'Ұйымдар',
                    organization: 'Ұйым',
                    my_organizations: 'Менің ұйымдарым',
                    organization_info: 'Ұйым туралы деректер',
                    choose_an_organization: 'Ұйымды таңдаңыз'
                },

                branches: {
                    title: 'Бөлімшелер',
                    organization_branches: 'Ұйымның бөлімшелері',
                    no_branches: 'Қосылған бөлімшелер жоқ',
                    no_inspect_branches: 'Тексеруге берілген бөлімшелер жоқ',
                    add_a_branch: 'Бөлімше қосу',
                    choose_a_branch: 'Бөлімшені таңдаңыз',
                    attention_1: 'Сіздің бөлімшеңіздің орналасқан жері автоматты түрде сіздің орналасқан жеріңізбен анықталды. Оны өзгерту үшін маркерді қажетті жерге сүйреңіз немесе картадағы қажетті орынды басыңыз',
                    attention_2: 'Сіз {{city}} қаласын таңдадыңыз. Маркерді сүйреп апару немесе картадағы қажетті орынды басу арқылы бөлімшенің нақты орнын көрсетіңіз',
                    found_objects: 'Табылған нысандар саны: {{count}}'
                },

                staff: {
                    title: 'Қызметкерлер'
                },

                services: {
                    title: 'Қызметтер'
                },

                operations: {
                    title: 'Барлық операциялар',
                    new_operation: 'Жаңа операция',
                    enter_the_amount: 'Cоманы енгізіңіз',
                    success_title: 'Рахмет! Сіздің төлеміңіз қабылданды',
                    success_description: 'Сіздің төлеміңіз сәтті қабылданды және өңдеуге жіберілді'
                },

                stock: {
                    title: 'Акция',
                    create: 'Жаңа акция жариялау',
                    coverage: 'Қамту',
                    select_coverage: 'Қамтуды таңдаңыз'
                },

                location: {
                    your_location_is: 'Сіздің қазіргі орналасқан жеріңіз {{city}} қаласы ма?',
                    current_location: 'Ағымдағы орналасқан жеріңіз',
                    choose_your_location: 'Қазіргі орналасқан жеріңізді таңдаңыз',
                    choose_another_city: 'Басқа қаланы таңдау',
                    build_a_route: 'Маршрут құру'
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