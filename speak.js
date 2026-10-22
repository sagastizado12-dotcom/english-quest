// Speaking curriculum (original content). Item kinds:
//  ['English','Español']                      -> repeat after me
//  {q:[en,es], a:[[en,es],...]}               -> answer a spoken question (any accepted answer)
//  {t:[en,es], a:[[en,es],...]}               -> role-play turn (the app speaks, you reply)
(function () {
const L = (id, lvl, title, items) => ({ id, lvl, title: title[0], titleEs: title[1], items });
window.SPEAK = [
// ---------- A1 ----------
L('s1',1,['Greetings','Saludos'],[
 ['Hello, how are you?','Hola, ¿cómo estás?'],['Good morning','Buenos días'],['Good night','Buenas noches'],['Nice to meet you','Mucho gusto'],['See you later','Nos vemos luego'],
 {q:['How are you today?','¿Cómo estás hoy?'],a:[['I am fine, thank you','Estoy bien, gracias'],['I am very well, thanks','Estoy muy bien, gracias'],['I am good, and you?','Estoy bien, ¿y tú?']]},
 {q:['What is your name?','¿Cómo te llamas?'],a:[['My name is Ana','Me llamo Ana'],['My name is Carlos','Me llamo Carlos'],['I am Sofia','Soy Sofía']]},
 {t:['Hi! Nice to meet you.','¡Hola! Mucho gusto.'],a:[['Nice to meet you too','Mucho gusto también'],['Hello, nice to meet you','Hola, mucho gusto']]},
 {t:['Have a nice day!','¡Que tengas un buen día!'],a:[['Thank you, you too','Gracias, igualmente'],['Thanks, see you later','Gracias, nos vemos luego']]}]),
L('s2',1,['Numbers and prices','Números y precios'],[
 ['One, two, three, four, five','Uno, dos, tres, cuatro, cinco'],['It costs ten dollars','Cuesta diez dólares'],['How much is this?','¿Cuánto cuesta esto?'],['That is too expensive','Eso es demasiado caro'],['I have twenty dollars','Tengo veinte dólares'],
 {q:['How old are you?','¿Cuántos años tienes?'],a:[['I am twelve years old','Tengo doce años'],['I am twenty years old','Tengo veinte años'],['I am thirty years old','Tengo treinta años']]},
 {q:['What is your favorite number?','¿Cuál es tu número favorito?'],a:[['My favorite number is seven','Mi número favorito es el siete'],['My favorite number is three','Mi número favorito es el tres']]},
 {t:['This bag is fifteen dollars.','Esta bolsa cuesta quince dólares.'],a:[['Okay, I will take it','Está bien, me la llevo'],['Do you have a cheaper one?','¿Tiene una más barata?']]},
 {t:['Here is your change: five dollars.','Aquí está su cambio: cinco dólares.'],a:[['Thank you very much','Muchas gracias'],['Thanks, have a good day','Gracias, que tenga buen día']]}]),
L('s3',1,['Telling the time','Decir la hora'],[
 ['What time is it?','¿Qué hora es?'],['It is seven o\'clock','Son las siete en punto'],['It is half past three','Son las tres y media'],['I wake up at six','Me levanto a las seis'],['The class starts at eight','La clase empieza a las ocho'],
 {q:['What time do you wake up?','¿A qué hora te levantas?'],a:[['I wake up at six','Me levanto a las seis'],['I wake up at seven','Me levanto a las siete'],['I wake up at five thirty','Me levanto a las cinco y treinta']]},
 {q:['What time do you go to bed?','¿A qué hora te acuestas?'],a:[['I go to bed at ten','Me acuesto a las diez'],['I go to bed at nine','Me acuesto a las nueve'],['I go to bed at eleven','Me acuesto a las once']]},
 {t:['Excuse me, what time is it?','Disculpe, ¿qué hora es?'],a:[['It is two o\'clock','Son las dos en punto'],['It is ten thirty','Son las diez y treinta'],['Sorry, I do not know','Lo siento, no sé']]},
 {t:['Are you late for class?','¿Vas tarde a la clase?'],a:[['Yes, I am late','Sí, voy tarde'],['No, I have time','No, tengo tiempo']]}]),
L('s4',1,['My family','Mi familia'],[
 ['This is my mother','Ella es mi mamá'],['I have one brother and two sisters','Tengo un hermano y dos hermanas'],['My father is a teacher','Mi papá es maestro'],['My grandmother lives with us','Mi abuela vive con nosotros'],['I love my family','Quiero mucho a mi familia'],
 {q:['Do you have brothers or sisters?','¿Tienes hermanos o hermanas?'],a:[['Yes, I have one brother','Sí, tengo un hermano'],['Yes, I have two sisters','Sí, tengo dos hermanas'],['No, I am an only child','No, soy hijo único']]},
 {q:['How many people are in your family?','¿Cuántas personas hay en tu familia?'],a:[['There are four people in my family','Hay cuatro personas en mi familia'],['There are five people in my family','Hay cinco personas en mi familia'],['There are three people in my family','Hay tres personas en mi familia']]},
 {t:['Who is this in the photo?','¿Quién es esta persona en la foto?'],a:[['This is my sister','Ella es mi hermana'],['This is my grandfather','Él es mi abuelo']]},
 {t:['Your family is very nice!','¡Tu familia es muy linda!'],a:[['Thank you, I love them','Gracias, los quiero mucho'],['Thanks, they are great','Gracias, son geniales']]}]),
L('s5',1,['Ordering food','Pedir comida'],[
 ['I would like a coffee, please','Quisiera un café, por favor'],['Can I see the menu?','¿Puedo ver el menú?'],['I am hungry','Tengo hambre'],['The soup is delicious','La sopa está deliciosa'],['Can I have the check, please?','¿Me trae la cuenta, por favor?'],
 {q:['What is your favorite food?','¿Cuál es tu comida favorita?'],a:[['My favorite food is pupusas','Mi comida favorita son las pupusas'],['My favorite food is pizza','Mi comida favorita es la pizza'],['I like rice and beans','Me gusta el arroz con frijoles']]},
 {t:['Hello! What would you like to eat?','¡Hola! ¿Qué le gustaría comer?'],a:[['I would like chicken and rice, please','Quisiera pollo con arroz, por favor'],['Can I have three pupusas, please?','¿Me da tres pupusas, por favor?']]},
 {t:['Anything to drink?','¿Algo de tomar?'],a:[['Water, please','Agua, por favor'],['An orange juice, please','Un jugo de naranja, por favor'],['No, thank you','No, gracias']]},
 {t:['Is everything okay?','¿Todo bien?'],a:[['Yes, it is delicious','Sí, está delicioso'],['Yes, thank you','Sí, gracias']]}]),
L('s6',1,['Colors and clothes','Colores y ropa'],[
 ['My shirt is blue','Mi camisa es azul'],['I like your shoes','Me gustan tus zapatos'],['She is wearing a red dress','Ella lleva un vestido rojo'],['These pants are too big','Estos pantalones son muy grandes'],['I need a jacket','Necesito una chaqueta'],
 {q:['What is your favorite color?','¿Cuál es tu color favorito?'],a:[['My favorite color is green','Mi color favorito es el verde'],['My favorite color is blue','Mi color favorito es el azul'],['I like red','Me gusta el rojo']]},
 {q:['What are you wearing today?','¿Qué llevas puesto hoy?'],a:[['I am wearing a T-shirt and jeans','Llevo una camiseta y jeans'],['I am wearing a black jacket','Llevo una chaqueta negra']]},
 {t:['I love your shirt!','¡Me encanta tu camisa!'],a:[['Thank you, it is new','Gracias, es nueva'],['Thanks, it was a gift','Gracias, fue un regalo']]}]),
L('s7',1,['My home','Mi casa'],[
 ['I live in a small house','Vivo en una casa pequeña'],['My room is next to the kitchen','Mi cuarto está al lado de la cocina'],['There are two bedrooms','Hay dos dormitorios'],['We have a big garden','Tenemos un jardín grande'],['The bathroom is upstairs','El baño está arriba'],
 {q:['Where do you live?','¿Dónde vives?'],a:[['I live in San Salvador','Vivo en San Salvador'],['I live in a small town','Vivo en un pueblo pequeño'],['I live in the city','Vivo en la ciudad']]},
 {q:['What is your favorite room?','¿Cuál es tu cuarto favorito?'],a:[['My favorite room is the kitchen','Mi cuarto favorito es la cocina'],['My favorite room is my bedroom','Mi cuarto favorito es mi dormitorio']]},
 {t:['Welcome to my house! Come in.','¡Bienvenido a mi casa! Pasa.'],a:[['Thank you, your house is beautiful','Gracias, tu casa es bonita'],['Thanks for inviting me','Gracias por invitarme']]}]),
// ---------- A2 ----------
L('s8',2,['Shopping','De compras'],[
 ['I am looking for a gift','Estoy buscando un regalo'],['Do you have this in a smaller size?','¿Tiene esto en una talla más pequeña?'],['Can I try it on?','¿Me lo puedo probar?'],['I will pay with cash','Voy a pagar en efectivo'],['Is this on sale?','¿Esto está en oferta?'],
 {q:['Where do you usually go shopping?','¿Dónde sueles ir de compras?'],a:[['I usually go to the market','Normalmente voy al mercado'],['I usually go to the mall','Normalmente voy al centro comercial'],['I shop online','Compro en línea']]},
 {t:['Can I help you find something?','¿Le ayudo a buscar algo?'],a:[['Yes, I need a pair of shoes','Sí, necesito un par de zapatos'],['No thanks, I am just looking','No gracias, solo estoy viendo']]},
 {t:['The fitting room is over there.','El probador está por allá.'],a:[['Thank you, I will try it on','Gracias, me lo voy a probar'],['Great, thanks','Perfecto, gracias']]},
 {t:['How would you like to pay?','¿Cómo desea pagar?'],a:[['With a card, please','Con tarjeta, por favor'],['I will pay with cash','Voy a pagar en efectivo']]}]),
L('s9',2,['Directions','Direcciones'],[
 ['Excuse me, where is the bank?','Disculpe, ¿dónde está el banco?'],['Go straight for two blocks','Siga recto dos cuadras'],['Turn right at the traffic light','Doble a la derecha en el semáforo'],['It is across from the park','Está enfrente del parque'],['Is it far from here?','¿Está lejos de aquí?'],
 {q:['How do you get to school or work?','¿Cómo llegas a la escuela o al trabajo?'],a:[['I take the bus','Tomo el bus'],['I walk','Camino'],['I go by car','Voy en carro']]},
 {t:['Excuse me, can you help me? I am lost.','Disculpe, ¿me puede ayudar? Estoy perdido.'],a:[['Sure, where do you want to go?','Claro, ¿a dónde quiere ir?'],['Of course, what are you looking for?','Por supuesto, ¿qué está buscando?']]},
 {t:['Where is the nearest pharmacy?','¿Dónde está la farmacia más cercana?'],a:[['It is on the next corner','Está en la próxima esquina'],['Go straight and turn left','Siga recto y doble a la izquierda'],['Sorry, I am not from here','Lo siento, no soy de aquí']]},
 {t:['Thank you so much for your help!','¡Muchas gracias por su ayuda!'],a:[['You are welcome','De nada'],['No problem, have a good day','No hay problema, que tenga buen día']]}]),
L('s10',2,['Daily routine','La rutina diaria'],[
 ['I take a shower every morning','Me baño todas las mañanas'],['I eat breakfast at seven','Desayuno a las siete'],['After school I do my homework','Después de la escuela hago la tarea'],['I usually walk to work','Normalmente camino al trabajo'],['On Sundays I visit my grandparents','Los domingos visito a mis abuelos'],
 {q:['What do you do in the morning?','¿Qué haces en la mañana?'],a:[['I eat breakfast and go to school','Desayuno y voy a la escuela'],['I take a shower and go to work','Me baño y voy al trabajo'],['I make coffee','Hago café']]},
 {q:['What do you do on weekends?','¿Qué haces los fines de semana?'],a:[['I play soccer with my friends','Juego fútbol con mis amigos'],['I visit my family','Visito a mi familia'],['I rest and watch movies','Descanso y veo películas']]},
 {t:['You look tired today.','Te ves cansado hoy.'],a:[['Yes, I went to bed late','Sí, me acosté tarde'],['I woke up very early','Me levanté muy temprano']]}]),
L('s11',2,['On the phone','Por teléfono'],[
 ['Hello, who is calling?','Hola, ¿quién habla?'],['Can I speak to Maria, please?','¿Puedo hablar con María, por favor?'],['Please hold on a moment','Espere un momento, por favor'],['Can you call me back later?','¿Me puede llamar más tarde?'],['Sorry, I think you have the wrong number','Disculpe, creo que tiene el número equivocado'],
 {q:['What is your phone number?','¿Cuál es tu número de teléfono?'],a:[['My number is five five five, one two three four','Mi número es cinco cinco cinco, uno dos tres cuatro'],['Sorry, I do not remember it','Lo siento, no lo recuerdo']]},
 {t:['Good morning, Green Clinic. How can I help you?','Buenos días, Clínica Green. ¿En qué le puedo ayudar?'],a:[['I would like to make an appointment','Quisiera hacer una cita'],['Can I speak to the doctor, please?','¿Puedo hablar con el doctor, por favor?']]},
 {t:['She is not here right now. Can I take a message?','Ella no está en este momento. ¿Le dejo un mensaje?'],a:[['Yes, please tell her to call me','Sí, por favor dígale que me llame'],['No thanks, I will call later','No gracias, llamaré más tarde']]},
 {t:['Sorry, I can not hear you very well.','Disculpe, no le escucho muy bien.'],a:[['Can you hear me now?','¿Me escucha ahora?'],['Sorry, I will call you back','Disculpe, le vuelvo a llamar']]}]),
L('s12',2,['At school','En la escuela'],[
 ['Can you repeat that, please?','¿Puede repetir eso, por favor?'],['How do you say this in English?','¿Cómo se dice esto en inglés?'],['I do not understand','No entiendo'],['May I go to the bathroom?','¿Puedo ir al baño?'],['I forgot my notebook','Olvidé mi cuaderno'],
 {q:['What is your favorite subject?','¿Cuál es tu materia favorita?'],a:[['My favorite subject is math','Mi materia favorita es matemáticas'],['My favorite subject is English','Mi materia favorita es inglés'],['I like science','Me gusta ciencias']]},
 {t:['Did you finish your homework?','¿Terminaste tu tarea?'],a:[['Yes, I finished it','Sí, la terminé'],['Not yet, I need more time','Todavía no, necesito más tiempo']]},
 {t:['Please open your books to page ten.','Por favor abran sus libros en la página diez.'],a:[['Which page, please?','¿Qué página, por favor?'],['Okay, teacher','Está bien, maestra']]},
 {t:['Do you have any questions?','¿Tienen alguna pregunta?'],a:[['Yes, I have a question','Sí, tengo una pregunta'],['No, everything is clear','No, todo está claro']]}]),
L('s13',2,['Weather and seasons','El clima y las estaciones'],[
 ['It is very hot today','Hace mucho calor hoy'],['It is going to rain','Va a llover'],['Take an umbrella','Lleva un paraguas'],['The rainy season starts in May','La temporada de lluvia empieza en mayo'],['I like sunny days','Me gustan los días soleados'],
 {q:['What is the weather like today?','¿Cómo está el clima hoy?'],a:[['It is sunny and hot','Está soleado y caluroso'],['It is cloudy','Está nublado'],['It is raining','Está lloviendo']]},
 {q:['Do you prefer hot or cold weather?','¿Prefieres el clima caliente o frío?'],a:[['I prefer hot weather','Prefiero el clima caliente'],['I prefer cold weather','Prefiero el clima frío']]},
 {t:['Wow, it is raining a lot!','¡Vaya, está lloviendo mucho!'],a:[['Yes, let us stay inside','Sí, quedémonos adentro'],['I forgot my umbrella','Olvidé mi paraguas']]}]),
L('s14',2,['Feelings','Sentimientos'],[
 ['I am very happy today','Estoy muy feliz hoy'],['I feel a little nervous','Me siento un poco nervioso'],['She is tired after work','Ella está cansada después del trabajo'],['Do not worry, it will be okay','No te preocupes, todo va a estar bien'],['I am excited about the trip','Estoy emocionado por el viaje'],
 {q:['How do you feel right now?','¿Cómo te sientes ahora?'],a:[['I feel happy','Me siento feliz'],['I feel a little tired','Me siento un poco cansado'],['I feel good','Me siento bien']]},
 {t:['What is wrong? You look sad.','¿Qué pasa? Te ves triste.'],a:[['I miss my family','Extraño a mi familia'],['I am okay, just tired','Estoy bien, solo cansado']]},
 {t:['I passed my exam!','¡Pasé mi examen!'],a:[['Congratulations! I am so happy for you','¡Felicidades! Me alegro mucho por ti'],['That is great news!','¡Qué buena noticia!']]}]),
// ---------- B1 ----------
L('s15',3,['At the doctor','En el médico'],[
 ['I have a headache and a fever','Tengo dolor de cabeza y fiebre'],['My stomach hurts','Me duele el estómago'],['I need to make an appointment','Necesito hacer una cita'],['Take this medicine twice a day','Tome esta medicina dos veces al día'],['I am allergic to penicillin','Soy alérgico a la penicilina'],
 {q:['How long have you felt sick?','¿Desde cuándo se siente enfermo?'],a:[['Since yesterday','Desde ayer'],['For two days','Desde hace dos días'],['Since last week','Desde la semana pasada']]},
 {t:['Hello, what seems to be the problem?','Hola, ¿cuál parece ser el problema?'],a:[['I have a sore throat','Me duele la garganta'],['I have had a cough for three days','Tengo tos desde hace tres días']]},
 {t:['Do you have any allergies?','¿Tiene alguna alergia?'],a:[['No, I do not have any allergies','No, no tengo ninguna alergia'],['Yes, I am allergic to peanuts','Sí, soy alérgico al maní']]},
 {t:['Drink a lot of water and get some rest.','Tome mucha agua y descanse.'],a:[['Thank you, doctor','Gracias, doctor'],['How many days should I rest?','¿Cuántos días debo descansar?']]}]),
L('s16',3,['Travel and the airport','Viajes y el aeropuerto'],[
 ['Where is the check-in counter?','¿Dónde está el mostrador de registro?'],['Here is my passport','Aquí está mi pasaporte'],['My flight leaves at nine thirty','Mi vuelo sale a las nueve y treinta'],['I have one suitcase','Tengo una maleta'],['Which gate do I go to?','¿A qué puerta tengo que ir?'],
 {q:['Where would you like to travel?','¿A dónde te gustaría viajar?'],a:[['I would like to travel to Canada','Me gustaría viajar a Canadá'],['I would like to visit Japan','Me gustaría visitar Japón'],['I want to go to the beach','Quiero ir a la playa']]},
 {t:['Good morning. Passport, please.','Buenos días. Pasaporte, por favor.'],a:[['Here you are','Aquí tiene'],['Here is my passport','Aquí está mi pasaporte']]},
 {t:['What is the purpose of your trip?','¿Cuál es el motivo de su viaje?'],a:[['I am here on vacation','Vengo de vacaciones'],['I am visiting my family','Vengo a visitar a mi familia'],['I am here for work','Vengo por trabajo']]},
 {t:['Would you like a window or an aisle seat?','¿Prefiere asiento de ventana o de pasillo?'],a:[['A window seat, please','Ventana, por favor'],['An aisle seat, please','Pasillo, por favor']]}]),
L('s17',3,['At the bank','En el banco'],[
 ['I would like to open an account','Quisiera abrir una cuenta'],['I need to send money to my family','Necesito enviar dinero a mi familia'],['What is the exchange rate today?','¿Cuál es el tipo de cambio hoy?'],['My card is not working','Mi tarjeta no funciona'],['Can I see my balance, please?','¿Puedo ver mi saldo, por favor?'],
 {t:['Good afternoon. How can I help you today?','Buenas tardes. ¿En qué le puedo ayudar hoy?'],a:[['I would like to deposit some money','Quisiera depositar dinero'],['I need to open a savings account','Necesito abrir una cuenta de ahorros']]},
 {t:['Can I see an ID, please?','¿Me permite una identificación, por favor?'],a:[['Sure, here it is','Claro, aquí está'],['Here is my ID card','Aquí está mi documento de identidad']]},
 {t:['How much would you like to withdraw?','¿Cuánto desea retirar?'],a:[['One hundred dollars, please','Cien dólares, por favor'],['Fifty dollars, please','Cincuenta dólares, por favor']]},
 {t:['Is there anything else I can do for you?','¿Hay algo más en que le pueda ayudar?'],a:[['No, that is all, thank you','No, eso es todo, gracias'],['Yes, I have one more question','Sí, tengo una pregunta más']]}]),
L('s18',3,['Work and job interviews','Trabajo y entrevistas'],[
 ['I have three years of experience','Tengo tres años de experiencia'],['I am a hard worker','Soy muy trabajador'],['I work well in a team','Trabajo bien en equipo'],['I am available to start next week','Puedo empezar la próxima semana'],['Thank you for the opportunity','Gracias por la oportunidad'],
 {q:['What do you do for work?','¿A qué te dedicas?'],a:[['I am a student','Soy estudiante'],['I work in a store','Trabajo en una tienda'],['I am a nurse','Soy enfermera']]},
 {t:['Tell me a little about yourself.','Cuénteme un poco sobre usted.'],a:[['I am friendly and I like to learn','Soy amable y me gusta aprender'],['I am organized and responsible','Soy organizado y responsable']]},
 {t:['Why do you want this job?','¿Por qué quiere este trabajo?'],a:[['I want to grow and learn new skills','Quiero crecer y aprender nuevas habilidades'],['I like working with people','Me gusta trabajar con personas']]},
 {t:['Do you have any questions for us?','¿Tiene alguna pregunta para nosotros?'],a:[['What are the working hours?','¿Cuál es el horario de trabajo?'],['When can I start?','¿Cuándo puedo empezar?']]}]),
L('s19',3,['Small talk','Conversación casual'],[
 ['How was your day?','¿Qué tal tu día?'],['Nice weather today, right?','Bonito día hoy, ¿verdad?'],['What do you do for fun?','¿Qué haces para divertirte?'],['Have you seen any good movies lately?','¿Has visto alguna buena película últimamente?'],['It was nice talking to you','Fue un gusto hablar contigo'],
 {q:['What do you like to do in your free time?','¿Qué te gusta hacer en tu tiempo libre?'],a:[['I like to listen to music','Me gusta escuchar música'],['I like to play soccer','Me gusta jugar fútbol'],['I like to read books','Me gusta leer libros']]},
 {t:['How long have you lived here?','¿Cuánto tiempo has vivido aquí?'],a:[['I have lived here for five years','He vivido aquí por cinco años'],['I moved here last year','Me mudé aquí el año pasado'],['All my life','Toda mi vida']]},
 {t:['Are you busy this weekend?','¿Estás ocupado este fin de semana?'],a:[['Not really, why?','La verdad no, ¿por qué?'],['Yes, I have to work','Sí, tengo que trabajar']]}]),
L('s20',3,['Last weekend','El fin de semana pasado'],[
 ['I visited my grandparents','Visité a mis abuelos'],['We went to the beach on Saturday','Fuimos a la playa el sábado'],['I stayed at home and rested','Me quedé en casa y descansé'],['We cooked dinner together','Cocinamos la cena juntos'],['I watched a funny movie','Vi una película divertida'],
 {q:['What did you do last weekend?','¿Qué hiciste el fin de semana pasado?'],a:[['I played soccer with my friends','Jugué fútbol con mis amigos'],['I visited my family','Visité a mi familia'],['I cleaned my house','Limpié mi casa']]},
 {q:['Did you have a good weekend?','¿Tuviste un buen fin de semana?'],a:[['Yes, it was great','Sí, estuvo genial'],['It was okay, I was busy','Estuvo bien, estuve ocupado']]},
 {t:['Where did you go on Sunday?','¿A dónde fuiste el domingo?'],a:[['I went to church with my family','Fui a la iglesia con mi familia'],['I went to the park','Fui al parque'],['I did not go anywhere','No fui a ningún lado']]}]),
// ---------- B1+ ----------
L('s21',4,['Future plans','Planes para el futuro'],[
 ['Next year I am going to study at the university','El próximo año voy a estudiar en la universidad'],['I want to learn English to get a better job','Quiero aprender inglés para conseguir un mejor trabajo'],['One day I would like to travel around the world','Algún día me gustaría viajar por el mundo'],['I hope to start my own business','Espero empezar mi propio negocio'],['This summer we will visit our cousins','Este verano visitaremos a nuestros primos'],
 {q:['What are your plans for the future?','¿Cuáles son tus planes para el futuro?'],a:[['I am going to study engineering','Voy a estudiar ingeniería'],['I want to be a doctor','Quiero ser doctor'],['I want to travel and work abroad','Quiero viajar y trabajar en el extranjero']]},
 {q:['What will you do tomorrow?','¿Qué harás mañana?'],a:[['I will go to work','Iré al trabajo'],['I will study for my exam','Estudiaré para mi examen'],['I will visit my friend','Visitaré a mi amigo']]},
 {t:['Where do you see yourself in five years?','¿Dónde te ves en cinco años?'],a:[['I see myself working in a big company','Me veo trabajando en una empresa grande'],['I hope to have my own business','Espero tener mi propio negocio']]}]),
L('s22',4,['Giving opinions','Dar opiniones'],[
 ['In my opinion, practice is very important','En mi opinión, la práctica es muy importante'],['I think this book is better than the movie','Creo que este libro es mejor que la película'],['I completely agree with you','Estoy completamente de acuerdo contigo'],['I see your point, but I disagree','Entiendo tu punto, pero no estoy de acuerdo'],['It depends on the situation','Depende de la situación'],
 {q:['Is it better to live in the city or the country?','¿Es mejor vivir en la ciudad o en el campo?'],a:[['I think the city is better','Creo que la ciudad es mejor'],['In my opinion, the country is better','En mi opinión, el campo es mejor'],['It depends on the person','Depende de la persona']]},
 {q:['Should students wear uniforms?','¿Los estudiantes deberían usar uniforme?'],a:[['Yes, I think uniforms are a good idea','Sí, creo que los uniformes son una buena idea'],['No, I think students should choose','No, creo que los estudiantes deberían elegir']]},
 {t:['I think video games are a waste of time.','Creo que los videojuegos son una pérdida de tiempo.'],a:[['I disagree, some games teach a lot','No estoy de acuerdo, algunos juegos enseñan mucho'],['I agree, people should go outside more','Estoy de acuerdo, la gente debería salir más']]}]),
L('s23',4,['Making complaints','Hacer reclamos'],[
 ['Excuse me, there is a problem with my order','Disculpe, hay un problema con mi pedido'],['This is not what I ordered','Esto no es lo que pedí'],['The room is too noisy','La habitación tiene mucho ruido'],['I would like a refund, please','Quisiera un reembolso, por favor'],['Could I speak to the manager?','¿Podría hablar con el gerente?'],
 {t:['Is everything okay with your meal?','¿Todo bien con su comida?'],a:[['Actually, my soup is cold','En realidad, mi sopa está fría'],['Sorry, this is not what I ordered','Disculpe, esto no es lo que pedí']]},
 {t:['I am sorry to hear that. What happened?','Lamento escuchar eso. ¿Qué pasó?'],a:[['The shirt I bought is broken','La camisa que compré está rota'],['My package arrived late','Mi paquete llegó tarde']]},
 {t:['We can give you a new one or a refund.','Le podemos dar uno nuevo o un reembolso.'],a:[['I would prefer a refund, please','Preferiría un reembolso, por favor'],['A new one is fine, thank you','Uno nuevo está bien, gracias']]},
 {t:['Again, we apologize for the problem.','De nuevo, disculpe el inconveniente.'],a:[['Thank you for your help','Gracias por su ayuda'],['That is okay, thanks for fixing it','Está bien, gracias por solucionarlo']]}]),
L('s24',4,['Telling a story','Contar una historia'],[
 ['When I was a child, I lived near the ocean','Cuando era niño, vivía cerca del mar'],['While I was walking home, it started to rain','Mientras caminaba a casa, empezó a llover'],['Suddenly, the lights went out','De repente, se fue la luz'],['In the end, everything was fine','Al final, todo salió bien'],['I will never forget that day','Nunca olvidaré ese día'],
 {q:['What did you like to do when you were a child?','¿Qué te gustaba hacer cuando eras niño?'],a:[['I liked to play outside with my friends','Me gustaba jugar afuera con mis amigos'],['I liked to draw pictures','Me gustaba dibujar'],['I liked to swim in the river','Me gustaba nadar en el río']]},
 {t:['So what happened next?','¿Y qué pasó después?'],a:[['Then we called for help','Luego pedimos ayuda'],['After that, we went home','Después de eso, nos fuimos a casa']]},
 {t:['That is an amazing story!','¡Qué historia tan increíble!'],a:[['Thanks, it was a crazy day','Gracias, fue un día loco'],['I know, I still remember it','Lo sé, todavía lo recuerdo']]}]),
L('s25',4,['Helping and asking favors','Ayudar y pedir favores'],[
 ['Could you do me a favor?','¿Me podrías hacer un favor?'],['Would you mind closing the window?','¿Te importaría cerrar la ventana?'],['Let me help you with that','Déjame ayudarte con eso'],['I really appreciate your help','Realmente aprecio tu ayuda'],['If you need anything, just let me know','Si necesitas algo, solo avísame'],
 {t:['Could you help me carry these boxes?','¿Me podrías ayudar a cargar estas cajas?'],a:[['Sure, no problem','Claro, no hay problema'],['Sorry, I can not right now','Lo siento, ahora no puedo']]},
 {t:['Would you mind watching my bag for a minute?','¿Te importaría cuidar mi bolsa un minuto?'],a:[['Not at all, go ahead','Para nada, adelante'],['Of course, take your time','Por supuesto, tómate tu tiempo']]},
 {t:['Thank you so much, you are very kind.','Muchas gracias, eres muy amable.'],a:[['You are welcome, anytime','De nada, cuando quieras'],['It was my pleasure','Fue un placer']]}]),
];
// Extra role-plays (the app speaks one side; answer by voice, several accepted answers)
const R = (id, lvl, title, turns) => ({ id, lvl, title: title[0], titleEs: title[1], turns: turns.map(t => ({ app: t[0][0], appEs: t[0][1], replies: t[1].map(r => r[0]), repliesEs: t[1].map(r => r[1]) })) });
window.ROLEPLAYS_EXTRA = [
 R('d8',1,['Meeting a new classmate','Conocer a un compañero'],[
  [['Hi! Are you new here?','¡Hola! ¿Eres nuevo aquí?'],[['Yes, it is my first day','Sí, es mi primer día'],['Yes, I am new','Sí, soy nuevo']]],
  [['Welcome! Where are you from?','¡Bienvenido! ¿De dónde eres?'],[['I am from El Salvador','Soy de El Salvador'],['I am from Mexico','Soy de México']]],
  [['Do you want to sit with us at lunch?','¿Quieres sentarte con nosotros en el almuerzo?'],[['Yes, thank you!','¡Sí, gracias!'],['Sure, that sounds great','Claro, suena genial']]]]),
 R('d9',2,['At the pharmacy','En la farmacia'],[
  [['Hello, what do you need today?','Hola, ¿qué necesita hoy?'],[['I need something for a cold','Necesito algo para el resfriado'],['Do you have medicine for a headache?','¿Tiene medicina para el dolor de cabeza?']]],
  [['Take one pill every eight hours.','Tome una pastilla cada ocho horas.'],[['Okay, every eight hours','Está bien, cada ocho horas'],['Can I take it with food?','¿La puedo tomar con comida?']]],
  [['That will be six dollars.','Son seis dólares.'],[['Here you are','Aquí tiene'],['Can I pay with a card?','¿Puedo pagar con tarjeta?']]]]),
 R('d10',2,['Taking the bus','Tomar el bus'],[
  [['Where are you going?','¿A dónde va?'],[['I am going to the city center','Voy al centro de la ciudad'],['Does this bus go to the airport?','¿Este bus va al aeropuerto?']]],
  [['The ticket is one dollar.','El pasaje cuesta un dólar.'],[['Here is one dollar','Aquí tiene un dólar'],['Okay, thank you','Está bien, gracias']]],
  [['This is your stop.','Esta es su parada.'],[['Thank you very much','Muchas gracias'],['Thanks, have a good day','Gracias, que tenga buen día']]]]),
 R('d11',2,['Making plans with a friend','Hacer planes con un amigo'],[
  [['Do you want to go to the movies on Friday?','¿Quieres ir al cine el viernes?'],[['Yes, I would love to','Sí, me encantaría'],['Sorry, I am busy on Friday','Lo siento, estoy ocupado el viernes']]],
  [['What time is good for you?','¿Qué hora te queda bien?'],[['Seven o\'clock is good','A las siete está bien'],['How about six thirty?','¿Qué tal a las seis y treinta?']]],
  [['Great, see you there!','¡Genial, nos vemos allá!'],[['See you on Friday','Nos vemos el viernes'],['Okay, see you then','Está bien, nos vemos']]]]),
 R('d12',2,['At the hotel','En el hotel'],[
  [['Welcome to the Sunset Hotel. Do you have a reservation?','Bienvenido al Hotel Sunset. ¿Tiene reservación?'],[['Yes, I have a reservation','Sí, tengo una reservación'],['No, do you have a room for tonight?','No, ¿tiene una habitación para esta noche?']]],
  [['How many nights will you stay?','¿Cuántas noches se va a quedar?'],[['Two nights, please','Dos noches, por favor'],['Just one night','Solo una noche']]],
  [['Breakfast is from seven to ten.','El desayuno es de siete a diez.'],[['Great, thank you','Perfecto, gracias'],['Is there wifi in the room?','¿Hay wifi en la habitación?']]]]),
 R('d13',3,['Calling in sick','Avisar que estás enfermo'],[
  [['Hello, this is Mr. Lopez.','Hola, habla el señor López.'],[['Good morning, I am sorry but I am sick today','Buenos días, lo siento pero hoy estoy enfermo'],['Hello, I can not come to work today','Hola, hoy no puedo ir a trabajar']]],
  [['I am sorry to hear that. What is wrong?','Lamento escuchar eso. ¿Qué tiene?'],[['I have a fever','Tengo fiebre'],['I have a bad cold','Tengo un resfriado fuerte']]],
  [['Okay, rest and feel better soon.','Está bien, descanse y que se mejore pronto.'],[['Thank you, I will call you tomorrow','Gracias, le llamo mañana'],['Thank you for understanding','Gracias por entender']]]]),
 R('d14',3,['Renting an apartment','Alquilar un apartamento'],[
  [['Hello, are you calling about the apartment?','Hola, ¿llama por el apartamento?'],[['Yes, is it still available?','Sí, ¿todavía está disponible?'],['Yes, how much is the rent?','Sí, ¿cuánto es el alquiler?']]],
  [['The rent is five hundred dollars a month.','El alquiler es de quinientos dólares al mes.'],[['Are the bills included?','¿Están incluidos los servicios?'],['Can I see it this week?','¿Lo puedo ver esta semana?']]],
  [['You can visit it tomorrow at four.','Puede visitarlo mañana a las cuatro.'],[['Perfect, see you tomorrow','Perfecto, nos vemos mañana'],['That works for me, thank you','Me queda bien, gracias']]]]),
 R('d15',4,['Returning a product','Devolver un producto'],[
  [['Hi, how can I help you?','Hola, ¿en qué le puedo ayudar?'],[['I would like to return these headphones','Quisiera devolver estos audífonos'],['These headphones do not work','Estos audífonos no funcionan']]],
  [['Do you have the receipt?','¿Tiene el recibo?'],[['Yes, here it is','Sí, aquí está'],['Sorry, I lost it','Lo siento, lo perdí']]],
  [['Would you like a refund or an exchange?','¿Quiere un reembolso o un cambio?'],[['I would like a refund, please','Quisiera un reembolso, por favor'],['An exchange is fine','Un cambio está bien']]]]),
 R('d16',4,['Asking for a day off','Pedir un día libre'],[
  [['Hi, do you have a minute?','Hola, ¿tienes un minuto?'],[['Yes, I wanted to ask you something','Sí, quería preguntarte algo'],['Sure, what do you need?','Claro, ¿qué necesitas?']]],
  [['What can I do for you?','¿Qué puedo hacer por ti?'],[['Could I take Friday off?','¿Podría tomar el viernes libre?'],['I need a day off next week','Necesito un día libre la próxima semana']]],
  [['Sure, but please finish the report first.','Claro, pero primero termina el informe.'],[['Of course, I will finish it today','Por supuesto, lo termino hoy'],['No problem, thank you so much','No hay problema, muchas gracias']]]]),
];
ROLEPLAYS.push(...ROLEPLAYS_EXTRA);
// Register Spanish for every string so the Tap/Always/Off setting works everywhere
const add = (en, es) => { if (en && es && !ES[en]) ES[en] = es; };
for (const l of SPEAK) { add(l.title, l.titleEs); for (const it of l.items) { if (Array.isArray(it)) add(it[0], it[1]); else { const p = it.q || it.t; add(p[0], p[1]); it.a.forEach(a => add(a[0], a[1])); } } }
for (const r of ROLEPLAYS_EXTRA) { add(r.title, r.titleEs); r.turns.forEach(t => { add(t.app, t.appEs); t.replies.forEach((x, k) => add(x, t.repliesEs[k])); }); }
})();
