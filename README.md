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

## Предназначение

Цель данной надстройки - это автоматизации процесса создания документов, связанных с деятельностью отдела ВЭД (инвойсы, контракты, письма и т.д).

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
    - Происходит обновление надстройки, обычно это занимает от 15 до 30 минут
3. Изменение таблиц, такие как растягивание ее длины, автозаполнение и т.д. не распознаются программой, необходимо перезагрузить приложение.
4. При работе надстройки буфер обмена в excel не работает.
5. Любая другая програмная ошибка.

В случае возникновения критической ошибки нужно перезапустить надстройку - кликните мышкой в свободную область надстройки и зажмите комбинацию клавиш CTRL + R.
