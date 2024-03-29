# Excel Надстройка (Инструкция)

## Установка (Windows)

1. Создайте папку в сетевом расположении (например, \\\MyShare\MyManifests) и скопируйте XML-манифест файл в эту папку.
2. Добавьте расположение папки, содержащей манифест в список доверенных Excel приложений ("Trust Center"):
    1. Выберите вкладку File --> Options
    2. Выберите Trust Center --> Trust Center Settings --> Trusted Add-in Catalog
    3. В списке url выберите путь до папки, созданной в шаге 1, затем выберите Add Catalog. Укажите Show in Menu пункт, затем нажмите OK.
3. Перезапустите Excel и откройте пустой документ.
4. На вкладке Insert tab выберите My Add-Ins
5. В меню Office Add-ins выберите Shared Folders.
6. Выберите свою надстройку и нажмите Add. Иконка будет находится во вкладке Home, сама надстройка откроется в панели справа.

---

## Использование

Надстройка объединяет в себе несколько функциональностей:

-   Создание шаблона письма предложения на почту (в таблице с названием "Письмо суточные" ВАЖНО - надстройка определяет функционал по названию таблицы). Также в данном файле можно создавать предварительно заявки на внутренний рынок и Nordmile-заявки.
-   Создание шаблонов документов, связанных с файлами типа "Движение продукции"

Шаблоны документов делятся на:

-   Документы связанные с внутренним рынком
-   Документы связанные с внешним рынком

---

## Письмо суточные

### Предложение

1. Перейдите в файл с названием "Письмо суточные"
2. Перейдите во вкладку "Предложение"
3. Для создания шаблона заполните таблицу и поля формы, а после нажмите на кнопку "Создать письмо".
4. Перед этим для удобства можно открыть почту в другом окне на Mac - тогда письмо откроется в том же окне где почта, иначе окно с Windows может разделиться.

Приложение способно создавать 2 типа шаблона письма. Шаблон на внешний рынок создается при активном чекбоксе "Предложение на экспорт" (При неактивном - на внутренний).

---

### Заявки

1. Перейдите в файл с названием "Письмо суточные"
2. Перейдите во вкладку "Заявки"
3. Для создания шаблона заполните таблицу ("Nordmile" для Nordmilde-шаблона и "Внутренний рынок" для шаблона заявки на вн.рынок соответственно) и поля формы, а после нажмите на кнопку "Загрузить заявку" или "Загрузить все заявки".

---

## Движение продукции

### BL

1. Перейдите в файл типа "Движение продукции"
2. Перейдите во вкладку "Экспорт"
3. Заполните таблицу "Экспорт" или "Экспорт Хранение"
4. Для загрузки всех BL нажмите "Загрузить все BL", для загрузки конкретного файла нажмите на нужную вам вкладку с названием конкретного BL.

---

### Контракт

1. Перейдите в файл типа "Движение продукции"
2. Перейдите во вкладку "Экспорт"
    - Для создания дополнения на хранение в пункте сверху "Выберите таблицу" выберите пункт "Экспорт хранение"
    - Заполните таблицу "Экспорт хранения".
    - Для создания дополнения на экспорт выберите пункт "Экспорт"
    - Заполните таблицу "Экспорт"
    - В зависимости от выбранных в таблице условий продажи будет меняться шаблон, а также форма приложения.
3. Заполните поля формы и нажмите на вкладку с идентификатором нужного вам дополнения.

---

### Ассортименты и Образцы

1. Перейдите в файл типа "Движение продукции"
2. Перейдите во вкладку "Экспорт"
3. Заполните таблицу Экспорт или Экспорт Хранение, предварительно разделив продукцию по сортам.
4. Нажмите на "Загрузить ассортимент" чтобы загрузить ассортимент, либо на вкладку с названием агентирующей компании, чтобы загрузить образцы.

---

### Заявки

1. Перейдите в файл типа "Движение продукции"
2. Перейдите во вкладку "Внутренний рынок"
3. Повторите шаги (ссылка)

---

### Письма в порт

1. Перейдите в файл типа "Движение продукции"
2. Перейдите во вкладку "Внутренний рынок"
3. Заполните форму
    - В зависимости от поля "Условия доставки" будет меняться шаблон письма, а также поля формы.

---

## Возможные ошибки при выполнении программы

1. Неправильное заполнение таблицы:
    - Пустые поля
    - Поля таблицы, заполняющиеся по формулам, должны быть пустыми в том случае, если:
        - Формула выдает ошибку
        - Ячейки, на которые ссылается формула, пустые.
    - Отсутствие совпадения в БД
    - Отсутствующие столбцы - например в таблице "Внутренний рынок" в новых "Движениях" добавлен столбец "Транспорт")
2. Медленная загрузка, либо ошибка в консоли при старте надстройки:
    - Возможно вы выбрали неверный файл (не типа "Движение продукции" или "Письмо суточные")
    - Происходит обновление надстройки, обычно это занимает от 15 до 30 минут
3. Изменение таблиц, такие как растягивание ее длины, автозаполнение и т.д. не распознаются программой, необходимо перезагрузить приложение
4. Любая другая програмная ошибка

В случае возникновения критической ошибки нужно перезапустить надстройку - кликните мышкой в свободную область надстройки и зажмите комбинацию клавиш CTRL + R.
