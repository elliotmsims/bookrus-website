import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Outlet, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const country_json = {
  "countries": [
      {
          "name": "India",
          "authors": "George Orwell",
          "desc": "India, officially the Republic of India (Hindi: Bhārat Gaṇarājya),[24] is a country in South Asia. It is the seventh-largest country by area, the second-most populous country, and the most populous democracy in the world. Bounded by the Indian Ocean on the south, the Arabian Sea on the southwest, and the Bay of Bengal on the southeast, it shares land borders with Pakistan to the west;[f] China, Nepal, and Bhutan to the north; and Bangladesh and Myanmar to the east. In the Indian Ocean, India is in the vicinity of Sri Lanka and the Maldives; its Andaman and Nicobar Islands share a maritime border with Thailand, Myanmar and Indonesia. Modern humans arrived on the Indian subcontinent from Africa no later than 55,000 years ago.[25][26][27] Their long occupation, initially in varying forms of isolation as hunter-gatherers, has made the region highly diverse, second only to Africa in human genetic diversity.[28] Settled life emerged on the subcontinent in the western margins of the Indus river basin 9,000 years ago, evolving gradually into the Indus Valley Civilisation of the third millennium BCE.[29] By 1200 BCE, an archaic form of Sanskrit, an Indo-European language, had diffused into India from the northwest,[30][31] unfolding as the language of the Rigveda, and recording the dawning of Hinduism in India.[32] The Dravidian languages of India were supplanted in the northern and western regions.[33] By 400 BCE, stratification and exclusion by caste had emerged within Hinduism,[34] and Buddhism and Jainism had arisen, proclaiming social orders unlinked to heredity.[35] Early political consolidations gave rise to the loose-knit Maurya and Gupta Empires based in the Ganges Basin.[36] Their collective era was suffused with wide-ranging creativity,[37] but also marked by the declining status of women,[38] and the incorporation of untouchability into an organised system of belief.[g][39] In South India, the Middle kingdoms exported Dravidian-languages scripts and religious cultures to the kingdoms of Southeast Asia.[40] In the early medieval era, Christianity, Islam, Judaism, and Zoroastrianism put down roots on India's southern and western coasts.[41] Muslim armies from Central Asia intermittently overran India's northern plains,[42] eventually establishing the Delhi Sultanate, and drawing northern India into the cosmopolitan networks of medieval Islam.[43] In the 15th century, the Vijayanagara Empire created a long-lasting composite Hindu culture in south India.[44] In the Punjab, Sikhism emerged, rejecting institutionalised religion.[45] The Mughal Empire, in 1526, ushered in two centuries of relative peace,[46] leaving a legacy of luminous architecture.[h][47] Gradually expanding rule of the British East India Company followed, turning India into a colonial economy, but also consolidating its sovereignty.[48] British Crown rule began in 1858. The rights promised to Indians were granted slowly,[49][50] but technological changes were introduced, and ideas of education, modernity and the public life took root.[51] A pioneering and influential nationalist movement emerged, which was noted for nonviolent resistance and became the major factor in ending British rule.[52] In 1947 the British Indian Empire was partitioned into two independent dominions, a Hindu-majority Dominion of India and a Muslim-majority Dominion of Pakistan, amid large-scale loss of life and an unprecedented migration.[53] India has been a federal republic since 1950, governed in a democratic parliamentary system. It is a pluralistic, multilingual and multi-ethnic society. India's population grew from 361 million in 1951 to 1.211 billion in 2011.[54] During the same time, its nominal per capita income increased from US$64 annually to US$1,498, and its literacy rate from 16.6% to 74%. From being a comparatively destitute country in 1951,[55] India has become a fast-growing major economy and a hub for information technology services, with an expanding middle class.[56] It has a space programme which includes several planned or completed extraterrestrial missions. Indian movies, music, and spiritual teachings play an increasing role in global culture.[57] India has substantially reduced its rate of poverty, though at the cost of increasing economic inequality.[58] India is a nuclear-weapon state, which ranks high in military expenditure. It has disputes over Kashmir with its neighbours, Pakistan and China, unresolved since the mid-20th century.[59] Among the socio-economic challenges India faces are gender inequality, child malnutrition,[60] and rising levels of air pollution.[61] India's land is megadiverse, with four biodiversity hotspots.[62] Its forest cover comprises 21.7% of its area.[63] India's wildlife, which has traditionally been viewed with tolerance in India's culture,[64] is supported among these forests, and elsewhere, in protected habitats.",
          "image": "https://upload.wikimedia.org/wikipedia/commons/b/bb/India_%28orthographic_projection%29.svg"
      },
      {
          "name": "England",
          "authors": "William Shakespeare",
          "desc": "England is a country that is part of the United Kingdom.[6][7][8] It shares land borders with Wales to its west and Scotland to its north. The Irish Sea lies northwest of England and the Celtic Sea to the southwest. England is separated from continental Europe by the North Sea to the east and the English Channel to the south. The country covers five-eighths of the island of Great Britain, which lies in the North Atlantic, and includes over 100 smaller islands, such as the Isles of Scilly and the Isle of Wight. The area now called England was first inhabited by modern humans during the Upper Paleolithic period, but takes its name from the Angles, a Germanic tribe deriving its name from the Anglia peninsula, who settled during the 5th and 6th centuries. England became a unified state in the 10th century and has had a significant cultural and legal impact on the wider world since the Age of Discovery, which began during the 15th century.[9] The English language, the Anglican Church, and English law—the basis for the common law legal systems of many other countries around the world—developed in England, and the country's parliamentary system of government has been widely adopted by other nations.[10] The Industrial Revolution began in 18th-century England, transforming its society into the world's first industrialised nation.[11] England's terrain is chiefly low hills and plains, especially in central and southern England. However, there is upland and mountainous terrain in the north (for example, the Lake District and Pennines) and in the west (for example, Dartmoor and the Shropshire Hills). The capital is London, which has the largest metropolitan area in the United Kingdom. England's population of 56.3 million comprises 84% of the population of the United Kingdom,[4] largely concentrated around London, the South East, and conurbations in the Midlands, the North West, the North East, and Yorkshire, which each developed as major industrial regions during the 19th century.[12] The Kingdom of England – which after 1535 included Wales – ceased being a separate sovereign state on 1 May 1707, when the Acts of Union put into effect the terms agreed in the Treaty of Union the previous year, resulting in a political union with the Kingdom of Scotland to create the Kingdom of Great Britain.[13][14] In 1801, Great Britain was united with the Kingdom of Ireland (through another Act of Union) to become the United Kingdom of Great Britain and Ireland. In 1922 the Irish Free State seceded from the United Kingdom, leading to the latter being renamed the United Kingdom of Great Britain and Northern Ireland.[15]",
          "image": "https://upload.wikimedia.org/wikipedia/commons/b/b3/England_in_the_UK_and_Europe.svg"
      },
      {
          "name": "Russia",
          "authors": "Leo Tolstoy",
          "desc": "Russia (Russian: Россия, tr. Rossiya, pronounced [rɐˈsʲijə]), or the Russian Federation,[c] is a transcontinental country spanning Eastern Europe and Northern Asia. It is the largest country in the world by area, covering over 17,125,191 square kilometres (6,612,073 sq mi), and encompassing one-eighth of Earth's inhabitable landmass. Russia extends across eleven time zones and borders sixteen sovereign nations, the most of any country in the world.[d] It is the ninth-most populous country and the most populous country in Europe, with a population of 145.5 million. Moscow, the capital, is the largest city entirely within Europe, while Saint Petersburg is the country's second-largest city and cultural centre. Other major urban areas include Novosibirsk, Yekaterinburg, Nizhny Novgorod and Kazan. The East Slavs emerged as a recognisable group in Europe between the 3rd and 8th centuries AD. The medieval state of Kievan Rus' arose in the 9th century. In 988, it adopted Orthodox Christianity from the Byzantine Empire. Rus' ultimately disintegrated, and among its principalities, the Grand Duchy of Moscow rose. By the early 18th century, Russia had vastly expanded through conquest, annexation, and exploration to evolve into the Russian Empire, the third-largest empire in history. Following the Russian Revolution, the Russian SFSR became the largest and the principal constituent of the Soviet Union, the world's first constitutionally socialist state. The Soviet Union played a decisive role in the Allied victory in World War II and emerged as a superpower and rival to the United States during the Cold War. The Soviet era saw some of the most significant technological achievements of the 20th century, including the world's first human-made satellite and the launching of the first human into space. Following the dissolution of the Soviet Union in 1991, the newly independent Russian SFSR renamed itself the Russian Federation. In the aftermath of the constitutional crisis of 1993, a new constitution was adopted, and Russia has since been governed as a federal semi-presidential republic. Vladimir Putin and the United Russia party have dominated Russia's political system since 2000. Since the turn of the century, Russia has experienced democratic backsliding and has shifted into an authoritarian state. Russia is a great power and potential superpower. It is ranked 52nd on the Human Development Index, with a universal healthcare system and free university education. Russia's economy is the world's eleventh-largest by nominal GDP and the sixth-largest by GDP (PPP). It is a recognized nuclear-weapons state, possessing the world's largest stockpile of nuclear weapons, with the second-most powerful military and the fourth-highest military expenditure. Russia's extensive mineral and energy resources are the world's largest, and it is among the leading producers of oil and natural gas globally. It is a permanent member of the United Nations Security Council, a member of the G20, the SCO, the Council of Europe,[e] BRICS, the APEC, the OSCE, the IIB and the WTO, as well as the leading member of the CIS, the CSTO, and the EAEU. Russia is also home to 30 UNESCO World Heritage Sites.",
          "image": "https://upload.wikimedia.org/wikipedia/commons/c/c6/L.N.Tolstoy_Prokudin-Gorsky.jpg"
      }
  ]
};

export function Countries() {
    return(
      <div class="Countries">
        <Container>
            <h1>Countries!</h1>

            <h3>Number of countries: {country_json.countries.length}</h3>

            <Row>
                <Col>Country Name</Col>
                <Col>Country Authors</Col>
            </Row>
            
            {country_json.countries.map((country, index) => {
                return(
                    <Row>
                        <Col>
                            <Link to={`/countries/${index}`}>{country.name}</Link>
                        </Col>
                        <Col>{country.authors}</Col>
                    </Row>
                )
            })}
        </Container>
      <Outlet />
      </div>
    )
}

export function Country() {
  let params = useParams();
  let country = getCountry(parseInt(params.countryId, 10));
  return (
      <>
          <h1>Country: {country.name}</h1>

          <h3>Authors: {country.authors}</h3>

          <h3>Description:</h3>

          <p>{country.desc}</p>

          <img src={country.image} alt={country.name} width="512" height="512"/>
      </>
  )
}

export function getCountry(countryId) {
  return country_json.countries[countryId];
}