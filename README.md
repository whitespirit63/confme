# Conf.Me
Платформа представляет собой единое решение для организации и проведения онлайн-, офлайн- и гибридных мероприятий
(конференции, выставки, форумы, онлайн-встречи и вебинары), которое поможет облегчить процессы, сэкономить время, получить
подробную аналитику и повысить вовлеченность участников.
### Функционал профиля организатора
- Создать новое мероприятие
- Список мероприятий
- Аналитика
- Планировщик
- CRM
### Функционал профиля участника
- Профиль участника
- Расписание
- Личное расписание
- Карта
- Спонсоры
- Сессии
- Назначить встречу
- Чаты
- Материалы
- Корзина
- Список участников
- Опросы
### Общий функционал
- Трансляции
- Геймификация
- Вебинарные комнаты
- Видеозвонки
- Матчмейкинг и таргетированная реклама
- Система билетов
# Документация
- Архитектура проекта
# Работаем с GitHub'ом

( Если что, можете почитать эту инфу с [официального сайта git]( https://git-scm.com/book/ru/v2/%D0%92%D0%B5%D1%82%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D0%B2-Git-%D0%9E%D1%81%D0%BD%D0%BE%D0%B2%D1%8B-%D0%B2%D0%B5%D1%82%D0%B2%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B8-%D1%81%D0%BB%D0%B8%D1%8F%D0%BD%D0%B8%D1%8F ))

Допустим, у нас есть каркас приложения ( главное меню и куча пустых кнопок ). На данном этапе мы начнем разработку основного функционала приложения.
Предположим, вы решили создать профиль участника ( это может быть видеозвонок, карта и другое. Главное, чтобы это было что-то одно ), начали писать код и в какой-то момент поняли, что вы зашли в тупик и хотите переключиться на что-то попроще, например, расписание, но код уже написан и вы не уверены, может ли он пригодиться в будущем или придется начать все сначала. В таком случае поможет **ветвление**.

Каждый раз, когда вы начинаете разрабатывать новую функцию, вам нужно делать следующее:
1. Создать новую ветку и перейти на нее, командой:
`git checkout -b branch_name`
2. Написать код. По мере необходимости вы можете сохранять изменения в вашу ветку командами:

    `git add --all` -> `git commit -m 'fix bugs'` -> `git push`
    
3. Если функция доделана и все отлично работает, просто сливаем *branch_name* с мастером командой ( если не работает см. пункт 4 ):
   
    `git checkout master` -> `git merge branch_name`

    Может вылезти ошибка слияния из-за конфликтов. Чтобы увидеть, в каких файлах конфликт напишите:
    `git status`. Редактируем эти файлы и пишем `git commit`.
 

    Далее просто удаляем созданную нами ранее ветку:

    `git branch -d branch_name`

4. Представим, на каком то этапе написания кода вы осознали, что у вас не получается доделать функцию или просто хотите заняться чем-то более важным, 
тогда вы переходите в ветку мастер
`git checkout master`, после выполнения этой команды ваша локальная папка с проектом изменится, все изменения файлов ( в т.ч. создание и удаление ), 
которые вы делали в созданной вами ветке откатятся ( вы в любой момент сможете к ним вернуться командой `git checkout branch_name` ).

     На гитхабе во вкладке Issues создаете проблему, описываете что вы сделали и что осталось сделать, сохраняете.

     Теперь вы можете создать новую ветку ( см. пункт 1) или, если кто-то создал проблему, заходите в Issues, читаете ее и после этого переходите в его ветку 
     `git checkout  issue_branch_name`.

