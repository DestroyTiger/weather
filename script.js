// const url = new XMLHttpRequest();
// url.open("GET","https://countriesnow.space/api/v0.1/countries/population/cities");
// url.onload=()=>{
//     console.log(JSON.parse(url.response));

// }

// url.send()


// const url = new XMLHttpRequest();
// url.open("POST","https://countriesnow.space/api/v0.1/countries/population/cities/filter");
// const body={country:"nigeria"};
// url.onload=()=>{
//     console.log(JSON.parse(url.response));

// }
// url.setRequestHeader("Content-Type","Application/json")
// url.send(JSON.stringify(body));


const countryList = document.querySelector(".country");
const city = document.querySelector(".city");
const body = document.querySelector("body");
const list = document.querySelector(".list");
const countryinput = document.querySelector("#countryinput");
const cityinput = document.querySelector("#cityinput");
const buttonSend = document.querySelector(".sendBox button");
const boxIteams = document.querySelector(".boxIteams");
const url = new XMLHttpRequest();
let countryName, cityNameText;
function showAll(listIteams) {
    for (let i of listIteams) {
        listIteams.style.display = 'flex';

    }
}
url.open("GET", "https://countriesnow.space/api/v0.1/countries");
url.onload = () => {

    const data = JSON.parse(url.response).data;
    // console.log(data.length);
    data.forEach(iteams => {
        const li = document.createElement("li");
        li.classList = "country-items iteams";
        const countrylink = document.createElement("a");
        // countrylink.href = "#";
        countrylink.className = "countrylink";
        countrylink.style.textDecoration = "none";
        countrylink.style.color = "#0A0B0C";
        countrylink.innerText = iteams.country;

        li.appendChild(countrylink);
        countryList.appendChild(li);
        // console.log(`Cuntry : ${iteams.country} Have ${iteams.cities.length} City Include: ${iteams.cities}`);
    });
    countryinput.placeholder += ` From ${data.length}  Countries`
    let keypresscountry, keypresscity;
    const countryItems = document.querySelectorAll(".country-items");
    countryItems.forEach((listitem) => {
        // console.log(listitem.children[0].innerText.includes(countryinput.value))
        countryinput.addEventListener('keyup', () => {
            keypresscountry = countryinput.value;
            if (countryinput.value.length > 0) {
                if (listitem.children[0].innerText.toLowerCase().includes(keypresscountry.toLowerCase())) {
                    listitem.style.display = 'flex';
                }
                else
                    listitem.style.display = 'none';


            }

        });
    });





    list.addEventListener("click", (e) => {

        if (e.target.id === "countryinput") {

            countryList.classList.toggle("showmenu");
        }
        if (e.target.id !== "countryinput") {

            countryList.classList.remove("showmenu");
        }

    });

    // countryinput.addEventListener("keyup", () => {

    //     if (countryinput.value.length > 0) {

    //     }
    // });




    const countryListIteams = document.querySelectorAll(".country-items");
    countryListIteams.forEach((iteams, index) => {

        countryinput.addEventListener("click", () => {
            iteams.style.display = 'flex';

        });
        // console.log(iteams.innerText)
        iteams.addEventListener("click", () => {
            cityinput.removeAttribute("disabled");

            countryinput.value = iteams.innerText;
            city.classList = "city list-style showmenu";
            // console.log(data[index].cities);
            cityinput.value = "";
            city.innerHTML = "";
            data[index].cities.forEach(iteams => {
                const li = document.createElement("li");
                li.classList = "city-items iteams";
                const citylink = document.createElement("a");
                // citylink.href = "#";
                citylink.className = "citylink";
                citylink.style.textDecoration = "none";
                citylink.style.color = "#0A0B0C";
                citylink.innerText = iteams;
                if (iteams === "Tiran")
                    citylink.innerText = "tehran";

                li.appendChild(citylink);
                city.appendChild(li);
                // console.log(iteams)

            });

            cityinput.click();
            cityinput.focus();
            cityinput.placeholder = `Select Your City From ${data[index].cities.length}  Cities`;


            const cityListIteams = document.querySelectorAll(".city-items");
            cityListIteams.forEach((iteams, index) => {
                iteams.addEventListener("click", () => {
                    let cityName = cityListIteams[index].children[0].innerText;
                    cityinput.value = cityName;
                    // city.classList.remove("showmenu");
                    city.classList = "city list-style showmenurev";





                    // console.log(cityListIteams[index].children[0].innerText);
                    // console.log(city.classList);
                });


            });
            cityListIteams.forEach((listitem) => {
                cityinput.addEventListener("click", () => {
                    listitem.style.display = 'flex';

                });
                // console.log(listitem.children[0].innerText.includes(countryinput.value))
                cityinput.addEventListener('keyup', () => {
                    keypresscity = cityinput.value;
                    if (cityinput.value.length > 0) {
                        if (listitem.children[0].innerText.toLowerCase().includes(keypresscity.toLowerCase())) {
                            listitem.style.display = 'flex';
                        }
                        else
                            listitem.style.display = 'none';


                    }

                });



            });
        });

    });
    cityinput.addEventListener("click", () => {
        city.classList = "city list-style showmenu";

    });
    body.addEventListener("click", (e) => {
        // console.log(e.target.className)
        if (e.target.id !== "cityinput" & e.target.classList[1] !== "iteams") {
            city.classList = "city list-style showmenurev";

        }
    });



}



buttonSend.addEventListener("click", () => {
    if ((countryinput.value.length > 0) & (cityinput.value.length > 0)) {
        cityinput.setAttribute("disabled", "");
        countryName = countryinput.value;
        cityNameText = cityinput.value;
        // console.log(`${countryinput.value} your city ${cityinput.value}`);
        const keyApi = "04afb73321552aa8f30b0523f5c3f45c";
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityinput.value}&appid=${keyApi}&units=metric`;
        // console.log(weatherUrl);
        fetch(weatherUrl).then(res => res.json())
            .then(allInfo => {
                console.log(allInfo);
                if (allInfo.name !== undefined) {
                    const showIteams = document.createElement("div");
                    showIteams.className = "iteamsShow";
                    let cani = Math.floor(allInfo.main.temp), mincanti = Math.floor(allInfo.main.temp_min - Math.random() * 5), maxcanti =Math.floor( allInfo.main.temp_max + Math.random() * 5);
                    showIteams.innerHTML = `<header>
                <h3 title="${cityNameText}"><span class="showIteams" >${allInfo.name}</span></h3>
                <div class="countryInfo showIteams"><span  title="${countryName}"><img src="https://openweathermap.org/images/flags/${allInfo.sys.country.toLowerCase()}.png"
                            ></span><span title="${countryName}">${allInfo.sys.country}</span></div>
            </header>
            <main>
                <div class="cantigadinfo">
                    <h3 class="cantigrad" title="${Math.floor(allInfo.main.temp)}  centigrade"><span class="showIteams"> ${cani}<sup> 0</sup> C</span> </h3>
                    <h3 class="cantigradmin" title="${mincanti}  centigrade"><span class="showIteams">  ${mincanti}<sup> 0</sup> C</span> <span class="showIteams"><svg
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="#74acef" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M12 5v13M5 12l7 7 7-7" />
                            </svg></span></h3>
                    <h3 class="cantigradmax" title="${maxcanti}  centigrade"><span class="showIteams">  ${maxcanti}<sup> 0</sup> C</span> <span class="showIteams"><svg
                                xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                                fill="none" stroke="#f8871c" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M12 19V6M5 12l7-7 7 7" />
                            </svg></span></h3>

                </div>

                <img class="showIteams" title="${allInfo.weather[0].description}" src="https://openweathermap.org/img/wn/${allInfo.weather[0].icon}@4x.png" alt="Clude">
            </main>
            <footer>
                <h3 title=" ${allInfo.weather[0].main}"><span class="showIteams">Status : ${allInfo.weather[0].main}</span></h3>
                <h3 title=" ${allInfo.weather[0].description}"><span class="showIteams descre">Description : ${allInfo.weather[0].description}</span></h3>
            </footer>`;
                    boxIteams.appendChild(showIteams);
                }
                else
                    alert("City is Not Found!!!");
            });
        cityinput.value = countryinput.value = "";
        cityinput.placeholder = "Select Your City";
    }
    else {
        alert("Complate all Field");
    }

});

url.send();

// let countrypers=" افغانستان , آلبانی , الجزایر , آندورا , آنگولا , آنگویلا , آنتیگوا و باربودا , آرژانتین , ارمنستان , آروبا , استرالیا , اتریش , آذربایجان , باهاما , بحرین , بنگلادش , باربادوس , بلاروس , بلژیک , بلیز , بنین , برمودا , بوتان , بولیوی , بوسنی و هرزگوین , بوتسوانا , برزیل , قلمرو اقیانوس هند بریتانیا , برونئی , بلغارستان , بورکینافاسو , میانمار , بوروندی , کامبوج , کامرون , کانادا , کیپ ورد , جزایر کیمن , جمهوری آفریقای مرکزی , چاد , جزیره کریسمس , جزایر کوکوس (کیلینگ). , جزایر کوک , شیلی , چین , کلمبیا , کومور , کنگو , کاستاریکا , کرواسی , کوبا , قبرس , جمهوری چک , دانمارک , جیبوتی , دومینیکا , جمهوری دومینیکن , تیمور شرقی , توکلائو , جزایر تورکس و کایکوس , اکوادور , مصر , ناجی , گینه استوایی , اریتره , استونی , اتیوپی , جزایر فارو , جزایر فالکلند , فیجی , فنلاند , فرانسه , پلینزی فرانسه , گابن , گامبیا , گرجستان , جبل الطارق , آلمان , غنا , یونان , گرینلند , گوادلوپ , گرانادا , گرنزی , گواتمالا , گوام , گینه , گینه بیسائو , گویان , هائیتی , جزیره هرد و جزایر مک دونالد , اردن , هندوراس , هنگ کنگ , مجارستان , ایسلند , هند , اندونزی , ایران , عراق , ایرلند , جزیره من , اسرائيل , ایتالیا , ساحل عاج , جامائیکا , پیراهن ورزشی , ژاپن , اردن , قزاقستان , کنیا , کیریباتی , کره شمالی , کوزوو , کویت , قرقیزستان , لائوس , لتونی , لبنان , لسوتو , لیبریا , لیبی , لیختن اشتاین , لوکزامبورگ , مقدونیه , ماداگاسکار , جزایر مارشال , ماکائو , مالاوی , مالزی , مالدیو , مالی , مالت , مارتینیک , موریتانی , موریس , مایوت , مکزیک , مولداوی , مغولستان , مونته نگرو , موناکو , مونتسرات , مراکش , موزامبیک , میانمار , نامیبیا , نائورو , نپال , هلند , کالدونیای جدید , نیوزلند , نیکاراگوئه , نیجر , نیجریه , نروژ , نیوئه , جزیره نورفولک , جزایر ماریانای شمالی , عمان , پاکستان , پیتکرن , پالائو , پاناما , پاپوآ گینه نو , پاراگوئه , پرو , فیلیپین , لهستان , کشور پرتغال , پورتوریکو , کره جنوبی , لیتوانی , قطر , رومانی , روسیه , رواندا , ملاقات , ساموآ , سنت لوسیا , سن مارینو , سنت کیتس و نویس , سنت پیتر و میکلون , سنت وینسنت و گرنادین ها , عربستان سعودی , سنگال , جورجیا جنوبی و جزایر ساندویچ جنوبی , سائوتومه و پرنسیپ , سیرا لئون , صربستان , سیشل , سنگاپور , اسلواکی , اسلوونی , جزایر سلیمان , سومالی , آفریقای جنوبی , اسپانیا , سری لانکا , سودان , سورینام , سوازیلند , سوئد , سوئیس , سوریه , تایوان , تانزانیا , تایلند , رفتن , تونگا , ترینیداد و توباگو , تونس , بوقلمون , ترکمنستان , اوگاندا , اوکراین , امارات متحده عربی , انگلستان , ایالات متحده , اروگوئه , ازبکستان , وانواتو , ایالت شهر واتیکان (سریر مقدس) , والیس و فوتونا , ونزوئلا , ویتنام , یمن , زامبیا , زیمبابوه";
// countrypers=countrypers.split(",");
// console.log(countrypers);
