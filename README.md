# Жажда бизнеса, конференция

**1. Установка node.js:**

1.1 устанавливаем node.js глобально (https://docs.npmjs.com/getting-started/installing-node)

1.2 npm install -g

**2. Установка проекта:**

2.1. npm install

2.2. npm install -g gulp

2.3. npm install -g bower

**3. Запуск вёрстки:**

3.1. gulp serve


**4. Билд проекта:**

4.1. gulp build (финиширует на 'clean-tmp' не прерывая таскер)


** P.S
1. Все пакеты устанавливаются через флаг (--save\--save-dev). Пример "npm install gulp --save-dev" или "bower install jquery --save". bower.json и package.json актуальны.
2. Файловая структура строгая:



    resources/
	|
    └────assets/
         |
         ├────fonts/
 		 |    |
         |    ├────example-dir/
		 |    |
         |    └──── *.woff
         |
         ├────img/
         |    |
         |    ├────sprites/
		 |	  |	   |
		 |	  |    └──── *.png
         |    |
         |    ├────example-dir/
		 |	  |	   |
		 |	  |	   └──── *.jpg
         |    |
         |    └──── *.png
         |
         ├────js/
         |    |
         |    └────main.js
		 |
         ├────sass/
         |    |
         |    ├────default/
         |    |    |
         |    |    └──── _*.scss
		 |	  |
         |    ├────layout/
         |    |    |
         |    |    └──── _*.scss
		 |	  |
         |    ├────packages/
         |    |    |
         |    |    └──── *.scss
		 |	  |
         |    ├────pages/
         |    |    |
         |    |    └────example-dir/
         |    |         |
         |    |         ├──── _main.scss
         |	  |         |
         |    |         └──── _*.scss
		 |    |
         |    └────main.scss
         |
         └────pug/
              |
              ├────layout/
              |    |
              |    ├──── _default.pug
              |	   |
              |    └──── _*.
              |
              ├────example-dir/
              |    |
              |    └──── _*.
              |
              ├────index.pug
              |
              └──── *.pug



2.1. C подчёркивания(_) начинаются файлы, которые не должны компилиться. Соответсвенно без подчёркивания - наоборот. 
2.2. Обычно файлы с подчёркиваниями инклудятся(экспортируются) в основные файлы(без подчёркивания)