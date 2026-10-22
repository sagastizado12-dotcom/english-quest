// English Quest content — original, family-friendly.
const V = (s) => s.trim().split('\n').map(l => { const [w, es, d] = l.split('|').map(x => x.trim()); return { w, es, d }; });
window.VOCAB = {
greetings: V(`hello|hola|a friendly word to say when you meet someone
goodbye|adiós|what you say when you leave
please|por favor|a polite word when you ask for something
thank you|gracias|what you say when someone helps you
sorry|perdón / lo siento|what you say when you make a mistake
welcome|bienvenido|happy to see you arrive
morning|mañana|the early part of the day
evening|noche (temprano)|the end of the day, before night
name|nombre|the word people call you
friend|amigo|a person you like and trust
nice|agradable|good and pleasant
meet|conocer|to see someone for the first time
fine|bien|okay, good
excuse me|disculpe|a polite way to get attention
see you|nos vemos|a short way to say goodbye
how|cómo|a question word about the way something is
yes|sí|a word to agree
no|no|a word to disagree
great|genial|very good
introduce|presentar|to tell people someone's name`),
family: V(`mother|madre|a woman who has a child
father|padre|a man who has a child
sister|hermana|a girl with the same parents as you
brother|hermano|a boy with the same parents as you
grandmother|abuela|the mother of your mother or father
grandfather|abuelo|the father of your mother or father
aunt|tía|the sister of your mother or father
uncle|tío|the brother of your mother or father
cousin|primo / prima|the child of your aunt or uncle
son|hijo|a boy child of a parent
daughter|hija|a girl child of a parent
baby|bebé|a very young child
husband|esposo|the man a woman is married to
wife|esposa|the woman a man is married to
parents|padres|your mother and father
child|niño / niña|a young person
family|familia|parents, children and relatives
home|hogar|the place where you live
together|juntos|with each other
love|amor / amar|a strong warm feeling for someone`),
food: V(`water|agua|a clear drink we need to live
bread|pan|food made from flour and baked
rice|arroz|small white grains we cook and eat
beans|frijoles|small seeds we cook, often red or black
chicken|pollo|a bird; also its meat
egg|huevo|a round food from a chicken
cheese|queso|a food made from milk
apple|manzana|a round red or green fruit
banana|guineo / banano|a long yellow fruit
coffee|café|a hot brown drink
milk|leche|a white drink from cows
soup|sopa|hot liquid food in a bowl
breakfast|desayuno|the first meal of the day
lunch|almuerzo|the meal in the middle of the day
dinner|cena|the meal in the evening
hungry|hambriento|wanting to eat
thirsty|sediento|wanting to drink
delicious|delicioso|tastes very good
menu|menú|a list of food in a restaurant
vegetables|verduras|plants we eat, like carrots`),
numbers: V(`one|uno|the number 1
two|dos|the number 2
three|tres|the number 3
four|cuatro|the number 4
five|cinco|the number 5
six|seis|the number 6
seven|siete|the number 7
eight|ocho|the number 8
nine|nueve|the number 9
ten|diez|the number 10
eleven|once|the number 11
twelve|doce|the number 12
thirteen|trece|the number 13
twenty|veinte|the number 20
thirty|treinta|the number 30
fifty|cincuenta|the number 50
hundred|cien|the number 100
thousand|mil|the number 1,000
first|primero|number one in order
half|mitad|one of two equal parts`),
time: V(`today|hoy|this day
tomorrow|mañana|the day after today
yesterday|ayer|the day before today
week|semana|seven days
month|mes|about 30 days
year|año|twelve months
hour|hora|sixty minutes
minute|minuto|sixty seconds
early|temprano|before the usual time
late|tarde|after the usual time
Monday|lunes|the first work day of the week
Friday|viernes|the last work day of the week
weekend|fin de semana|Saturday and Sunday
always|siempre|every time
never|nunca|not one time
sometimes|a veces|some of the time
now|ahora|at this moment
later|más tarde|after now
night|noche|the dark time when we sleep
o'clock|en punto|used to say the exact hour`),
travel: V(`bus|bus|a big vehicle that carries many people
airport|aeropuerto|a place where planes arrive and leave
ticket|boleto|a paper that lets you travel or enter
passport|pasaporte|a document to travel to other countries
hotel|hotel|a place where travelers sleep and pay
map|mapa|a drawing that shows places and roads
left|izquierda|the opposite of right
right|derecha|the opposite of left
straight|recto|not turning
street|calle|a road in a town
corner|esquina|where two streets meet
beach|playa|sand next to the sea
station|estación|a place where buses or trains stop
suitcase|maleta|a bag for clothes when you travel
trip|viaje|going to a place and coming back
near|cerca|not far
far|lejos|a long way away
arrive|llegar|to get to a place
leave|salir|to go away from a place
visit|visitar|to go and see a place or person`),
work: V(`job|trabajo|work you do to get money
office|oficina|a room or building where people work
boss|jefe|the person who directs your work
meeting|reunión|when people meet to talk about work
computer|computadora|a machine for writing and the internet
email|correo electrónico|a message sent on the internet
busy|ocupado|having a lot to do
salary|salario|money you get for working
customer|cliente|a person who buys something
schedule|horario|a plan of times
team|equipo|people who work together
help|ayudar|to make things easier for someone
call|llamar|to talk on the phone
finish|terminar|to end something
start|empezar|to begin
interview|entrevista|a meeting to get a job
experience|experiencia|knowledge from doing things
manager|gerente|a person in charge of a group
uniform|uniforme|special clothes for work or school
break|descanso|a short rest from work`),
school: V(`teacher|maestro|a person who helps you learn
student|estudiante|a person who learns
book|libro|pages with words to read
pencil|lápiz|a tool for writing that you can erase
notebook|cuaderno|a book with empty pages to write in
class|clase|a group that learns together
homework|tarea|school work you do at home
question|pregunta|something you ask
answer|respuesta|what you say to a question
learn|aprender|to get new knowledge
read|leer|to look at words and understand them
write|escribir|to put words on paper
listen|escuchar|to pay attention to sounds
speak|hablar|to say words
practice|practicar|to do something many times to get better
test|examen|questions to check what you know
easy|fácil|not hard
difficult|difícil|hard, not easy
word|palabra|a unit of language
library|biblioteca|a place with many books to borrow`),
health: V(`doctor|doctor|a person who helps sick people
nurse|enfermera|a person who cares for sick people
sick|enfermo|not feeling well
headache|dolor de cabeza|a pain in your head
fever|fiebre|a hot body temperature when sick
medicine|medicina|something you take to feel better
hospital|hospital|a building where sick people get care
pharmacy|farmacia|a store that sells medicine
tired|cansado|needing rest or sleep
healthy|saludable|strong and well
exercise|ejercicio|moving your body to stay strong
sleep|dormir|to rest with your eyes closed
hurt|doler|to feel pain
cough|tos|air out of your throat with a noise
appointment|cita|a time to see a doctor
stomach|estómago|where food goes in your body
tooth|diente|a hard white thing in your mouth
better|mejor|more good, less sick
rest|descansar|to stop and relax
emergency|emergencia|a serious problem needing help fast`),
shopping: V(`store|tienda|a place where you buy things
money|dinero|what you use to pay
price|precio|how much something costs
cheap|barato|it does not cost much
expensive|caro|it costs a lot
buy|comprar|to get something with money
sell|vender|to give something for money
pay|pagar|to give money for something
cash|efectivo|money in paper and coins
card|tarjeta|a plastic card to pay
size|talla|how big something is
shirt|camisa|clothing for the top of your body
shoes|zapatos|things you wear on your feet
bag|bolsa|you carry things in it
receipt|recibo|a paper that shows what you paid
sale|oferta|a time when prices are lower
market|mercado|a place with many sellers
open|abierto|ready for customers
closed|cerrado|not open
change|cambio|money you get back`)
};
window.TOPICS = Object.keys(VOCAB);

// Glossary extras for passage words not in VOCAB
window.GLOSS_EXTRA = {
 small:['little, not big','pequeño'], big:['large','grande'], happy:['feeling good','feliz'], house:['a building where people live','casa'], city:['a big town','ciudad'], sun:['the star that gives us light','sol'], rain:['water falling from clouds','lluvia'], dog:['an animal that barks','perro'], cat:['a small animal that says meow','gato'], car:['a vehicle with four wheels','carro'], walk:['to move on your feet','caminar'], every:['each one','cada'], work:['to do a job','trabajar'], lives:['has a home','vive'], likes:['enjoys','le gusta'], favorite:['the one you like most','favorito'], garden:['land with plants and flowers','jardín'], village:['a very small town','pueblo'], bakery:['a store that makes bread','panadería'], volcano:['a mountain that can send out fire','volcán'], lake:['water with land all around it','lago'], neighbor:['a person who lives near you','vecino'], plan:['an idea of what to do','plan'], dream:['a hope for the future','sueño'], proud:['happy about something good you did','orgulloso'], nervous:['a little afraid','nervioso'], decided:['made a choice','decidió'], several:['more than two','varios'], although:['but; even if','aunque'], recipe:['instructions to cook food','receta'], improve:['get better','mejorar'], confident:['sure of yourself','seguro de sí mismo'], quickly:['fast','rápidamente'], kitchen:['the room where you cook','cocina'], vegetables:['plants we eat','verduras'], fresh:['new, not old','fresco'], bicycle:['a vehicle with two wheels and pedals','bicicleta'], weather:['sun, rain, wind, temperature','clima'], cloudy:['with many clouds','nublado'], umbrella:['it keeps the rain off you','paraguas'], volunteer:['to help without pay','voluntario'], community:['people living in one area','comunidad'], soccer:['a sport with a ball and feet','fútbol'], goal:['a point in soccer; or something you want to do','gol / meta'], score:['points in a game','puntuación'], careful:['paying attention to avoid problems','cuidadoso'], pupusas:['a Salvadoran food: thick tortilla with filling','pupusas'], tortillas:['flat round bread made of corn','tortillas'],
};

// Reading passages: level 1..4 (A1, A2, B1, B1+)
window.PASSAGES = [
 {id:'r1',lvl:1,title:'My Family',text:'My name is Ana. I live in a small house with my family. My mother is a teacher. My father is a doctor. I have one brother. His name is Leo. We have a dog. We are happy together.',
  q:[{t:'mc',q:'What is the mother\'s job?',o:['doctor','teacher','nurse'],a:1},{t:'tf',q:'Ana has two brothers.',a:false},{t:'mc',q:'What animal do they have?',o:['a cat','a dog','a bird'],a:1}]},
 {id:'r2',lvl:1,title:'Breakfast',text:'Every morning I eat breakfast at seven o\'clock. I eat bread and an egg. I drink milk. My sister drinks coffee. On Sunday we eat pupusas with beans and cheese. They are delicious.',
  q:[{t:'mc',q:'When does the writer eat breakfast?',o:['at six','at seven','at eight'],a:1},{t:'tf',q:'The sister drinks milk.',a:false},{t:'mc',q:'What do they eat on Sunday?',o:['soup','pupusas','rice'],a:1}]},
 {id:'r3',lvl:1,title:'At School',text:'Tom is a student. His class starts at eight. His teacher is nice. Tom likes to read books. He does not like tests. After school he does his homework in the library.',
  q:[{t:'tf',q:'Tom\'s class starts at eight.',a:true},{t:'mc',q:'Where does Tom do homework?',o:['at home','in the library','in the park'],a:1},{t:'tf',q:'Tom likes tests.',a:false}]},
 {id:'r4',lvl:2,title:'A Trip to the Beach',text:'Last weekend Maria and her cousin took the bus to the beach. The trip was two hours. The weather was sunny and hot. They swam in the sea and ate fresh fish for lunch. In the evening they walked on the sand and watched the sun go down.',
  q:[{t:'mc',q:'How did they travel?',o:['by car','by bus','by plane'],a:1},{t:'tf',q:'The weather was cloudy.',a:false},{t:'mc',q:'What did they eat for lunch?',o:['chicken','fish','pupusas'],a:1}]},
 {id:'r5',lvl:2,title:'The New Job',text:'Carlos has a new job at a hotel. He works at the front desk. He helps customers and answers the phone. His schedule is from nine to five, Monday to Friday. He is busy, but he likes his team. His manager says he is a good worker.',
  q:[{t:'mc',q:'Where does Carlos work?',o:['a hospital','a hotel','a school'],a:1},{t:'tf',q:'Carlos works on the weekend.',a:false},{t:'tf',q:'Carlos likes his team.',a:true}]},
 {id:'r6',lvl:2,title:'At the Market',text:'On Saturday morning Rosa goes to the market. She buys fresh vegetables, some apples and a bag of rice. The prices are cheap. She pays with cash and gets her change. Then she talks with her neighbor and walks home.',
  q:[{t:'mc',q:'When does Rosa go to the market?',o:['Friday night','Saturday morning','Sunday'],a:1},{t:'tf',q:'Rosa pays with a card.',a:false},{t:'mc',q:'Who does she talk with?',o:['her neighbor','her boss','her teacher'],a:0}]},
 {id:'r7',lvl:2,title:'A Visit to the Doctor',text:'Luis felt sick yesterday. He had a headache and a fever. He made an appointment with the doctor. The doctor said, "You need rest and water." Luis bought medicine at the pharmacy. Today he feels better.',
  q:[{t:'tf',q:'Luis had a fever.',a:true},{t:'mc',q:'What did the doctor say he needs?',o:['exercise','rest and water','coffee'],a:1},{t:'mc',q:'How does Luis feel today?',o:['worse','the same','better'],a:2}]},
 {id:'r8',lvl:3,title:'Learning to Cook',text:'When Elena was a child, she never cooked. Her grandmother made all the food. Last year Elena decided to learn. Every Sunday her grandmother teaches her a new recipe in the kitchen. At first Elena made many mistakes, but she kept practicing. Now she can make soup, rice and tortillas, and she feels proud.',
  q:[{t:'mc',q:'Who teaches Elena?',o:['her mother','her grandmother','a chef'],a:1},{t:'tf',q:'Elena made no mistakes at first.',a:false},{t:'mc',q:'How does Elena feel now?',o:['proud','nervous','tired'],a:0}]},
 {id:'r9',lvl:3,title:'The Volunteer Day',text:'Every month, people in our community have a volunteer day. Some neighbors clean the park, while others plant trees and flowers in the garden. Children help by picking up paper. Although the work is hard, everyone enjoys it because they do it together. After lunch, there is music and a soccer game.',
  q:[{t:'mc',q:'How often is the volunteer day?',o:['every week','every month','every year'],a:1},{t:'tf',q:'Children plant trees.',a:false},{t:'tf',q:'There is a soccer game after lunch.',a:true}]},
 {id:'r10',lvl:3,title:'A Job Interview',text:'Sofia had a job interview at a bank. She was nervous, so she practiced her answers with her brother the night before. She arrived fifteen minutes early. The manager asked about her experience and her goals. Sofia answered clearly and asked good questions. Two days later, they called her with good news.',
  q:[{t:'mc',q:'Who did Sofia practice with?',o:['her brother','her teacher','her friend'],a:0},{t:'tf',q:'Sofia arrived late.',a:false},{t:'mc',q:'What happened two days later?',o:['she got bad news','they called with good news','she had another test'],a:1}]},
 {id:'r11',lvl:4,title:'The Volcano Hike',text:'Several friends decided to hike a volcano near their village. They left very early because the weather in the afternoon is often cloudy and rainy. The path was steep, and they had to stop and rest several times. When they finally reached the top, they could see the lake below and the city far away. Although they were tired, they agreed that the view was worth every step.',
  q:[{t:'mc',q:'Why did they leave early?',o:['to avoid afternoon clouds and rain','to catch a bus','to eat breakfast at the top'],a:0},{t:'tf',q:'The path was easy and flat.',a:false},{t:'mc',q:'What could they see from the top?',o:['the beach','the lake and the city','a market'],a:1}]},
 {id:'r12',lvl:4,title:'Learning a New Language',text:'Learning a new language takes time, but small daily habits make a big difference. Listening to songs, reading short stories and talking with friends help you improve quickly. It is normal to make mistakes; in fact, mistakes show that you are trying. The most important thing is to practice a little every day and to be confident when you speak.',
  q:[{t:'tf',q:'The text says mistakes are a bad sign.',a:false},{t:'mc',q:'What is the most important thing?',o:['study only grammar','practice a little every day','never speak'],a:1},{t:'mc',q:'Which habit is mentioned?',o:['listening to songs','watching the news only','writing letters'],a:0}]},
];

// Speaking lessons (repeat after me), levels 1..4
window.SPEAK = [
 {id:'s1',lvl:1,title:'Hello!',items:['Hello','Good morning','Thank you','My name is Sam','Nice to meet you']},
 {id:'s2',lvl:1,title:'Numbers & time',items:['One, two, three','It is seven o\'clock','I am twenty years old','See you tomorrow']},
 {id:'s3',lvl:1,title:'Family',items:['This is my mother','I have one brother','My family is big','I love my family']},
 {id:'s4',lvl:2,title:'Food',items:['I would like some water, please','Can I have the menu?','The soup is delicious','I am hungry']},
 {id:'s5',lvl:2,title:'Travel',items:['Where is the bus station?','Turn left at the corner','How much is the ticket?','The hotel is near the beach']},
 {id:'s6',lvl:3,title:'Work',items:['I have a meeting at three','Can you help me with this?','I finished the report yesterday','My schedule changes every week']},
 {id:'s7',lvl:3,title:'Health',items:['I have a headache and a fever','I need to make an appointment','Take this medicine twice a day']},
 {id:'s8',lvl:4,title:'Opinions',items:['I think practice is very important','In my opinion, the weather is better in the morning','Although it was difficult, I enjoyed it','I would rather walk than take the bus']},
];

// Role-plays: app line, then suggested replies (any is fine; first is best)
window.ROLEPLAYS = [
 {id:'d1',lvl:1,title:'Introduce yourself',turns:[
  {app:'Hi! What is your name?',replies:['My name is Ana','I am Ana']},
  {app:'Nice to meet you. Where are you from?',replies:['I am from El Salvador','I come from El Salvador']},
  {app:'Great! What do you do?',replies:['I am a student','I work in a store']}]},
 {id:'d2',lvl:1,title:'Ordering food',turns:[
  {app:'Hello, welcome! What would you like?',replies:['I would like a chicken sandwich, please','Can I have pupusas, please']},
  {app:'Anything to drink?',replies:['Water, please','A coffee, please']},
  {app:'Here you go. That is eight dollars.',replies:['Here you are. Thank you!','Can I pay with a card?']}]},
 {id:'d3',lvl:2,title:'Asking directions',turns:[
  {app:'Hi, can I help you?',replies:['Yes, where is the bus station?','Excuse me, where is the bank?']},
  {app:'Go straight and turn left at the corner.',replies:['Is it far?','Thank you very much']},
  {app:'No, it is about five minutes on foot.',replies:['Great, thank you!','Thanks for your help']}]},
 {id:'d4',lvl:2,title:'At the store',turns:[
  {app:'Good afternoon. Are you looking for something?',replies:['Yes, I need a shirt','I am just looking, thanks']},
  {app:'What size do you need?',replies:['Medium, please','I need a large']},
  {app:'This one is on sale for fifteen dollars.',replies:['I will take it','Do you have it in blue?']}]},
 {id:'d5',lvl:3,title:'At the doctor',turns:[
  {app:'Hello, what seems to be the problem?',replies:['I have a headache and a fever','My stomach hurts']},
  {app:'How long have you felt this way?',replies:['Since yesterday','For two days']},
  {app:'Take this medicine and get some rest.',replies:['Thank you, doctor','How many times a day?']}]},
 {id:'d6',lvl:3,title:'Job interview',turns:[
  {app:'Tell me a little about yourself.',replies:['I am a hard worker and I like to learn','I have three years of experience in sales']},
  {app:'Why do you want this job?',replies:['I want to grow and help customers','I like working with a team']},
  {app:'When can you start?',replies:['I can start next Monday','I can start right away']}]},
 {id:'d7',lvl:4,title:'Making plans',turns:[
  {app:'Are you free this weekend?',replies:['Yes, I am free on Saturday','I am busy on Saturday, but Sunday is fine']},
  {app:'Would you like to go to the lake?',replies:['That sounds great','I would rather go to the beach']},
  {app:'Perfect. Let us meet at nine.',replies:['See you at nine','Okay, I will bring some food']}]},
];

// Writing lessons. Each exercise: fill {t:'fill',s:'I ___ a student.',o:[...],a:'am'}, order {t:'order',a:'...'}, translate {t:'tr',es:'',a:[accepted]}, free {t:'free',p:'',min:,vocab:[]}
window.WRITE = [
 {id:'w1',lvl:1,title:'Be: am / is / are',ex:[
  {t:'fill',s:'I ___ a student.',o:['am','is','are'],a:'am'},{t:'fill',s:'She ___ my sister.',o:['am','is','are'],a:'is'},{t:'fill',s:'They ___ happy.',o:['am','is','are'],a:'are'},
  {t:'order',a:'My name is Ana'},{t:'tr',es:'Yo soy de El Salvador.',a:['I am from El Salvador',"I'm from El Salvador"]}]},
 {id:'w2',lvl:1,title:'A / an & family',ex:[
  {t:'fill',s:'I eat ___ apple.',o:['a','an'],a:'an'},{t:'fill',s:'He has ___ brother.',o:['a','an'],a:'a'},{t:'order',a:'This is my mother'},
  {t:'tr',es:'Tengo una hermana.',a:['I have a sister',"I have one sister","I've got a sister"]},{t:'free',p:'Write 2 sentences about your family.',min:6,vocab:['mother','father','sister','brother','family']}]},
 {id:'w3',lvl:1,title:'Present simple',ex:[
  {t:'fill',s:'He ___ to school every day.',o:['go','goes','going'],a:'goes'},{t:'fill',s:'I ___ coffee in the morning.',o:['drink','drinks'],a:'drink'},{t:'order',a:'We eat rice and beans'},
  {t:'tr',es:'Ella trabaja en un hotel.',a:['She works in a hotel','She works at a hotel']},{t:'free',p:'What do you eat for breakfast?',min:5,vocab:['breakfast','eat','drink','bread','coffee','egg']}]},
 {id:'w4',lvl:2,title:'Have / has',ex:[
  {t:'fill',s:'She ___ a new job.',o:['have','has'],a:'has'},{t:'fill',s:'We ___ two cats.',o:['have','has'],a:'have'},{t:'order',a:'Do you have a ticket'},
  {t:'tr',es:'¿Dónde está la estación de autobuses?',a:['Where is the bus station','Where is the bus stop']},{t:'free',p:'Describe your house or your street.',min:8,vocab:['house','street','near','big','small']}]},
 {id:'w5',lvl:2,title:'Past simple',ex:[
  {t:'fill',s:'Yesterday I ___ to the market.',o:['go','went','goes'],a:'went'},{t:'fill',s:'She ___ a headache last night.',o:['has','had','have'],a:'had'},{t:'order',a:'We visited the beach last weekend'},
  {t:'tr',es:'Ayer comí pupusas.',a:['Yesterday I ate pupusas','I ate pupusas yesterday']},{t:'free',p:'What did you do yesterday?',min:8,vocab:['yesterday','went','ate','visited','worked']}]},
 {id:'w6',lvl:3,title:'Can / should',ex:[
  {t:'fill',s:'You ___ rest if you are sick.',o:['should','can','are'],a:'should'},{t:'fill',s:'___ you help me, please?',o:['Can','Do','Are'],a:'Can'},{t:'order',a:'I can speak a little English'},
  {t:'tr',es:'Debes tomar mucha agua.',a:['You should drink a lot of water','You should drink lots of water','You should drink much water']},{t:'free',p:'Give advice to a friend who is tired.',min:10,vocab:['should','sleep','rest','exercise','water']}]},
 {id:'w7',lvl:3,title:'Comparatives',ex:[
  {t:'fill',s:'The bus is ___ than the plane.',o:['cheap','cheaper','cheapest'],a:'cheaper'},{t:'fill',s:'This test is ___ difficult than the first.',o:['more','most','much'],a:'more'},{t:'order',a:'My city is bigger than your village'},
  {t:'tr',es:'El café es más caro que el agua.',a:['Coffee is more expensive than water','The coffee is more expensive than the water']},{t:'free',p:'Compare two places you know.',min:12,vocab:['bigger','smaller','more','than','better']}]},
 {id:'w8',lvl:4,title:'Future & plans',ex:[
  {t:'fill',s:'Next year I ___ study at the university.',o:['will','did','am'],a:'will'},{t:'fill',s:'We are going ___ visit my aunt.',o:['to','for','at'],a:'to'},{t:'order',a:'I am going to start a new job'},
  {t:'tr',es:'Mañana voy a visitar a mi abuela.',a:['Tomorrow I am going to visit my grandmother',"Tomorrow I'm going to visit my grandmother",'I am going to visit my grandmother tomorrow',"I'm going to visit my grandmother tomorrow",'Tomorrow I will visit my grandmother','I will visit my grandmother tomorrow']},
  {t:'free',p:'Write about your plans for next year.',min:15,vocab:['will','going to','next year','learn','plan']}]},
 {id:'w9',lvl:4,title:'Connecting ideas',ex:[
  {t:'fill',s:'I was tired, ___ I finished my homework.',o:['but','because','so'],a:'but'},{t:'fill',s:'She stayed home ___ she was sick.',o:['because','but','although'],a:'because'},{t:'order',a:'Although it rained we had a great day'},
  {t:'tr',es:'Estudio inglés porque quiero un mejor trabajo.',a:['I study English because I want a better job',"I'm studying English because I want a better job",'I am studying English because I want a better job']},{t:'free',p:'Why are you learning English? Use "because".',min:15,vocab:['because','learn','English','want','job']}]},
];

// Pronunciation sound lessons
window.SOUNDS = [
 {id:'p_ii',lvl:1,title:'Short i vs long ee',sym:'/ɪ/ vs /iː/',
  en:'For /iː/ (sheep) smile wide and hold the sound long, like Spanish "i" but longer. For /ɪ/ (ship) relax your lips and jaw; the sound is short, between "i" and "e".',
  es:'Para /iː/ (sheep) sonríe y alarga el sonido. Para /ɪ/ (ship) relaja los labios; el sonido es corto, entre "i" y "e".',
  words:['sit','big','fish','see','eat','green'],pairs:[['ship','sheep'],['live','leave'],['sit','seat'],['fill','feel'],['hit','heat']]},
 {id:'p_uu',lvl:1,title:'Short u vs long oo',sym:'/ʊ/ vs /uː/',
  en:'For /uː/ (fool) round your lips tight and make the sound long. For /ʊ/ (full) lips are only a little round and relaxed; keep it short.',
  es:'Para /uː/ (fool) redondea mucho los labios y alarga. Para /ʊ/ (full) labios poco redondos y relajados; sonido corto.',
  words:['book','good','foot','food','blue','school'],pairs:[['full','fool'],['pull','pool'],['look','Luke'],['should','shoed']]},
 {id:'p_th',lvl:2,title:'TH sounds',sym:'/θ/ /ð/',
  en:'Put the tip of your tongue lightly between your teeth and blow air. /θ/ (think) has no voice. /ð/ (this) uses your voice, so you feel a buzz. Do not say "t", "d" or "s".',
  es:'Pon la punta de la lengua entre los dientes y sopla. /θ/ (think) sin voz, como la "z" de España. /ð/ (this) con voz, sientes vibración. No digas "t", "d" ni "s".',
  words:['think','three','thank you','this','mother','the'],pairs:[['think','sink'],['three','tree'],['then','den'],['thank','tank'],['mouth','mouse']]},
 {id:'p_vb',lvl:1,title:'V vs B',sym:'/v/ vs /b/',
  en:'For /v/ touch your top teeth to your bottom lip and use your voice; it buzzes. For /b/ close both lips, then open them with a small pop. In English these are different sounds!',
  es:'Para /v/ pon los dientes de arriba sobre el labio de abajo y vibra. Para /b/ cierra los dos labios y ábrelos. ¡En inglés son sonidos distintos!',
  words:['very','seven','have','boy','bus','baby'],pairs:[['vest','best'],['van','ban'],['very','berry'],['vote','boat'],['curve','curb']]},
 {id:'p_shch',lvl:2,title:'SH vs CH',sym:'/ʃ/ vs /tʃ/',
  en:'/ʃ/ (shoe) is a long, soft sound like "shhh" for quiet; the tongue does not touch the top of the mouth. /tʃ/ (chew) starts with the tongue touching, then a quick release, like Spanish "ch".',
  es:'/ʃ/ (shoe) es un sonido largo como "shhh" para pedir silencio; la lengua no toca. /tʃ/ (chew) es como la "ch" del español: la lengua toca y se suelta rápido.',
  words:['she','fish','wash','chair','lunch','teacher'],pairs:[['ship','chip'],['shoes','choose'],['wash','watch'],['share','chair'],['sheep','cheap']]},
 {id:'p_s',lvl:1,title:'S + consonant (no "e")',sym:'/sp/ /st/ /sk/',
  en:'English words like school, speak, Spanish start with an "s" sound directly. Do not add "e" before it (not "eschool"). Start with a long "sss", then the next sound.',
  es:'Palabras como school, speak, Spanish empiezan directamente con "s". No digas "eschool" ni "espeak". Empieza con "sss" y sigue.',
  words:['school','speak','student','Spanish','street','small'],pairs:[['school','eschool'],['speak','espeak'],['star','estar'],['state','estate']]},
 {id:'p_ed',lvl:2,title:'-ed endings & final consonants',sym:'/t/ /d/ /ɪd/',
  en:'Say the last consonant clearly. -ed has three sounds: /t/ after voiceless sounds (walked = walkt), /d/ after voiced sounds (played = playd), /ɪd/ only after t or d (wanted, needed). Most -ed words do NOT add a syllable.',
  es:'Pronuncia la última consonante. -ed tiene tres sonidos: /t/ después de sonidos sin voz (walked = "walkt"), /d/ después de sonidos con voz (played = "playd"), /ɪd/ solo después de t o d (wanted, needed). ¡Casi nunca se agrega sílaba!',
  words:['walked','watched','played','cleaned','wanted','needed'],pairs:[['walk','walked'],['play','played'],['want','wanted'],['bed','bet'],['card','cart']]},
 {id:'p_sx',lvl:2,title:'-s endings',sym:'/s/ /z/ /ɪz/',
  en:'Plural and he/she verbs end in /s/ (cats, works), /z/ (dogs, plays) or /ɪz/ after s, sh, ch, x, z sounds (buses, watches). Always say the ending; it changes the meaning.',
  es:'Los plurales y verbos con he/she terminan en /s/ (cats), /z/ (dogs) o /ɪz/ después de s, sh, ch (buses, watches). Siempre pronuncia el final.',
  words:['cats','books','dogs','plays','buses','watches'],pairs:[['cat','cats'],['work','works'],['bus','buses'],['price','prize']]},
 {id:'p_jy',lvl:3,title:'J vs Y',sym:'/dʒ/ vs /j/',
  en:'/dʒ/ (jam, job) is like "ch" with voice: the tongue touches, then releases. /j/ (yes, you) is soft and open, like Spanish "i" gliding; the tongue does not touch.',
  es:'/dʒ/ (jam, job) es como "ch" pero con voz; la lengua toca y suelta. /j/ (yes, you) es suave, como una "i" rápida; la lengua no toca.',
  words:['job','juice','January','yes','you','yellow'],pairs:[['jet','yet'],['jam','yam'],['joke','yolk'],['Jess','yes']]},
 {id:'p_h',lvl:1,title:'H sound',sym:'/h/',
  en:'English /h/ is just a soft breath, like fogging a window. It is softer than Spanish "j". In words like hello, house, happy you must say it. (In "hour" and "honest" the h is silent.)',
  es:'La /h/ inglesa es solo aire suave, como empañar un vidrio. Es más suave que la "j" española. En hello, house, happy sí se pronuncia. (En "hour" y "honest" es muda.)',
  words:['hello','house','happy','hotel','hospital','help'],pairs:[['hat','at'],['high','eye'],['hold','old'],['heat','eat']]},
 {id:'p_r',lvl:3,title:'English R',sym:'/r/',
  en:'Curl your tongue back a little; the tip does NOT touch the top of your mouth. Round your lips slightly. It is not a tap or a roll like Spanish "r" or "rr".',
  es:'Dobla la lengua un poco hacia atrás; la punta NO toca el paladar. Redondea un poco los labios. No es como la "r" ni la "rr" del español.',
  words:['red','right','car','very','three','work'],pairs:[['right','light'],['road','load'],['rice','lice'],['berry','belly']]},
 {id:'p_schwa',lvl:3,title:'Schwa (the lazy vowel)',sym:'/ə/',
  en:'The most common English sound! In unstressed syllables, vowels often become a short, relaxed "uh". Banana = buh-NA-nuh. Do not say every vowel fully.',
  es:'¡El sonido más común del inglés! En sílabas sin acento, las vocales se vuelven un "uh" corto y relajado. Banana = "buh-NA-nuh". No pronuncies todas las vocales completas.',
  words:['about','banana','problem','teacher','family','today'],pairs:[['a cup','the cup'],['photo','photograph'],['to go','today']]},
 {id:'p_stress',lvl:4,title:'Word stress',sym:'ˈ',
  en:'In English one syllable is LOUDER, LONGER and HIGHER. The other syllables are short and weak (often schwa). Wrong stress can make a word hard to understand: hoTEL, COMfortable, deVELop, PHOtograph, phoTOgraphy.',
  es:'En inglés una sílaba es MÁS FUERTE, MÁS LARGA y MÁS ALTA. Las demás son cortas y débiles. Un acento incorrecto confunde: hoTEL, COMfortable, deVELop, PHOtograph, phoTOgraphy.',
  words:['hotel','comfortable','develop','photograph','photography','vegetable'],pairs:[['DEsert','deSSERT'],['REcord','reCORD'],['PREsent','preSENT']]},
];

// Pronunciation dictionary: respelling (CAPS = stress), IPA, syllables, sound lesson
window.PRON = {
 comfortable:['KUMF-ter-bul','ˈkʌmf.tɚ.bəl','com·for·ta·ble','p_stress'], vegetable:['VEJ-tuh-bul','ˈvedʒ.tə.bəl','veg·e·ta·ble','p_stress'], hotel:['hoh-TEL','hoʊˈtel','ho·tel','p_stress'], develop:['dih-VEL-up','dɪˈvel.əp','de·vel·op','p_stress'], photograph:['FOH-tuh-graf','ˈfoʊ.t̬ə.ɡræf','pho·to·graph','p_stress'], photography:['fuh-TOG-ruh-fee','fəˈtɑː.ɡrə.fi','pho·tog·ra·phy','p_stress'],
 think:['THINK','θɪŋk','think','p_th'], three:['THREE','θriː','three','p_th'], this:['DHIS','ðɪs','this','p_th'], the:['dhuh','ðə','the','p_th'], mother:['MUH-dher','ˈmʌð.ɚ','moth·er','p_th'], father:['FAH-dher','ˈfɑː.ðɚ','fa·ther','p_th'], brother:['BRUH-dher','ˈbrʌð.ɚ','broth·er','p_th'], thank:['THANK','θæŋk','thank','p_th'], thirsty:['THUR-stee','ˈθɝː.sti','thirs·ty','p_th'], birthday:['BURTH-day','ˈbɝːθ.deɪ','birth·day','p_th'], together:['tuh-GEH-dher','təˈɡeð.ɚ','to·geth·er','p_schwa'],
 ship:['SHIP','ʃɪp','ship','p_ii'], sheep:['SHEEP','ʃiːp','sheep','p_ii'], live:['LIV','lɪv','live','p_ii'], leave:['LEEV','liːv','leave','p_ii'], sit:['SIT','sɪt','sit','p_ii'], seat:['SEET','siːt','seat','p_ii'], beach:['BEECH','biːtʃ','beach','p_ii'], full:['FUL','fʊl','full','p_uu'], fool:['FOOL','fuːl','fool','p_uu'], book:['BUK','bʊk','book','p_uu'], food:['FOOD','fuːd','food','p_uu'], school:['SKOOL','skuːl','school','p_s'], good:['GUD','ɡʊd','good','p_uu'],
 very:['VEH-ree','ˈver.i','ver·y','p_vb'], vegetables:['VEJ-tuh-bulz','ˈvedʒ.tə.bəlz','veg·e·ta·bles','p_stress'], seven:['SEH-vun','ˈsev.ən','sev·en','p_vb'], have:['HAV','hæv','have','p_vb'], visit:['VIZ-it','ˈvɪz.ɪt','vis·it','p_vb'], bus:['BUS','bʌs','bus','p_vb'], travel:['TRAV-ul','ˈtræv.əl','trav·el','p_vb'],
 she:['SHEE','ʃiː','she','p_shch'], chair:['CHAIR','tʃer','chair','p_shch'], teacher:['TEE-cher','ˈtiː.tʃɚ','teach·er','p_shch'], kitchen:['KICH-in','ˈkɪtʃ.ən','kitch·en','p_shch'], lunch:['LUNCH','lʌntʃ','lunch','p_shch'], wash:['WAHSH','wɑːʃ','wash','p_shch'], watch:['WAHCH','wɑːtʃ','watch','p_shch'],
 speak:['SPEEK','spiːk','speak','p_s'], student:['STOO-dunt','ˈstuː.dənt','stu·dent','p_s'], spanish:['SPAN-ish','ˈspæn.ɪʃ','Span·ish','p_s'], street:['STREET','striːt','street','p_s'], station:['STAY-shun','ˈsteɪ.ʃən','sta·tion','p_s'], small:['SMAWL','smɑːl','small','p_s'], store:['STOR','stɔːr','store','p_s'], stomach:['STUM-uk','ˈstʌm.ək','stom·ach','p_s'], straight:['STRAYT','streɪt','straight','p_s'],
 walked:['WAWKT','wɑːkt','walked','p_ed'], played:['PLAYD','pleɪd','played','p_ed'], wanted:['WAHN-tid','ˈwɑːn.t̬ɪd','want·ed','p_ed'], needed:['NEE-did','ˈniː.dɪd','need·ed','p_ed'], finished:['FIN-isht','ˈfɪn.ɪʃt','fin·ished','p_ed'], decided:['dih-SY-did','dɪˈsaɪ.dɪd','de·cid·ed','p_ed'], visited:['VIZ-ih-tid','ˈvɪz.ɪ.t̬ɪd','vis·it·ed','p_ed'], cleaned:['KLEEND','kliːnd','cleaned','p_ed'], watched:['WAHCHT','wɑːtʃt','watched','p_ed'],
 buses:['BUS-iz','ˈbʌs.ɪz','bus·es','p_sx'], watches:['WAHCH-iz','ˈwɑː.tʃɪz','watch·es','p_sx'], works:['WURKS','wɝːks','works','p_sx'],
 job:['JAHB','dʒɑːb','job','p_jy'], yes:['YES','jes','yes','p_jy'], you:['YOO','juː','you','p_jy'], juice:['JOOS','dʒuːs','juice','p_jy'], yellow:['YEL-oh','ˈjel.oʊ','yel·low','p_jy'], january:['JAN-yoo-air-ee','ˈdʒæn.ju.er.i','Jan·u·ar·y','p_jy'], yesterday:['YES-ter-day','ˈjes.tɚ.deɪ','yes·ter·day','p_jy'],
 hello:['heh-LOH','heˈloʊ','hel·lo','p_h'], house:['HOWSS','haʊs','house','p_h'], happy:['HAP-ee','ˈhæp.i','hap·py','p_h'], hospital:['HOS-pih-tul','ˈhɑː.spɪ.t̬əl','hos·pi·tal','p_h'], hour:['OW-er','aʊr','hour','p_h'], help:['HELP','help','help','p_h'], hungry:['HUNG-gree','ˈhʌŋ.ɡri','hun·gry','p_h'],
 red:['RED','red','red','p_r'], right:['RYT','raɪt','right','p_r'], rice:['RYSS','raɪs','rice','p_r'], work:['WURK','wɝːk','work','p_r'], car:['KAR','kɑːr','car','p_r'], world:['WURLD','wɝːld','world','p_r'],
 about:['uh-BOWT','əˈbaʊt','a·bout','p_schwa'], banana:['buh-NAN-uh','bəˈnæn.ə','ba·na·na','p_schwa'], problem:['PRAH-blum','ˈprɑː.bləm','prob·lem','p_schwa'], family:['FAM-uh-lee','ˈfæm.əl.i','fam·i·ly','p_schwa'], today:['tuh-DAY','təˈdeɪ','to·day','p_schwa'], breakfast:['BREK-fust','ˈbrek.fəst','break·fast','p_schwa'], chocolate:['CHAWK-lit','ˈtʃɑːk.lət','choc·o·late','p_schwa'], interesting:['IN-truh-sting','ˈɪn.trə.stɪŋ','in·ter·est·ing','p_stress'],
 restaurant:['RES-tuh-rahnt','ˈres.tə.rɑːnt','res·tau·rant','p_stress'], wednesday:['WENZ-day','ˈwenz.deɪ','Wednes·day','p_stress'], doctor:['DOK-ter','ˈdɑːk.tɚ','doc·tor','p_schwa'], medicine:['MED-uh-sin','ˈmed.ɪ.sən','med·i·cine','p_stress'], appointment:['uh-POINT-ment','əˈpɔɪnt.mənt','ap·point·ment','p_stress'], computer:['kum-PYOO-ter','kəmˈpjuː.t̬ɚ','com·pu·ter','p_stress'], experience:['ik-SPEER-ee-uns','ɪkˈspɪr.i.əns','ex·pe·ri·ence','p_stress'], schedule:['SKEH-jool','ˈskedʒ.uːl','sched·ule','p_stress'], delicious:['dih-LISH-us','dɪˈlɪʃ.əs','de·li·cious','p_stress'], water:['WAH-der','ˈwɑː.t̬ɚ','wa·ter','p_schwa'], learn:['LURN','lɝːn','learn','p_r'], english:['ING-glish','ˈɪŋ.ɡlɪʃ','Eng·lish','p_ii'], name:['NAYM','neɪm','name',null], friend:['FREND','frend','friend','p_r'], please:['PLEEZ','pliːz','please','p_ii'], tomorrow:['tuh-MAR-oh','təˈmɑːr.oʊ','to·mor·row','p_schwa'], question:['KWES-chun','ˈkwes.tʃən','ques·tion','p_shch'], answer:['AN-ser','ˈæn.sɚ','an·swer','p_schwa'], difficult:['DIF-ih-kult','ˈdɪf.ə.kəlt','dif·fi·cult','p_stress'], receipt:['rih-SEET','rɪˈsiːt','re·ceipt','p_ii'], cheap:['CHEEP','tʃiːp','cheap','p_shch'], shoes:['SHOOZ','ʃuːz','shoes','p_shch'],
};
// map a word to a likely sound lesson when not in PRON
window.soundFor = function (w) {
 w = w.toLowerCase();
 if (PRON[w] && PRON[w][3]) return PRON[w][3];
 if (/th/.test(w)) return 'p_th'; if (/^s[ptkmnlw]/.test(w)) return 'p_s'; if (/v/.test(w)) return 'p_vb';
 if (/sh/.test(w)) return 'p_shch'; if (/ch/.test(w)) return 'p_shch'; if (/ed$/.test(w)) return 'p_ed';
 if (/^h/.test(w)) return 'p_h'; if (/^(j|y)/.test(w)) return 'p_jy'; if (/(ee|ea)/.test(w)) return 'p_ii'; if (/oo/.test(w)) return 'p_uu';
 if (/r/.test(w)) return 'p_r'; if (/[^s]s$/.test(w)) return 'p_sx'; if (w.length > 6) return 'p_stress'; return 'p_schwa';
};
