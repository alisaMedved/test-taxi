


# Demo

link: https://taxi-ten.vercel.app/


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Дополнение про баг CRA 

issue в CRA: https://github.com/facebook/create-react-app/issues/9429

Если вдруг появится есть хак: 

rm -rf yarn.lock \
rm -rf tsconfig.json \
yarn start 

### Дополнение про реализацию  

Так как в ТЗ указывался шаблон для поля адреса: улица, дом \
Что приложение должно принимать адреса только в пределах одного города и его пригородных районов

В данном приложении надо вводить и помечать адреса только из Ижевска, иначе инпут будет подсвечен \
как инпут с невалидным адресом и будет выведено соответсвующее сообщение об ошибке. 



