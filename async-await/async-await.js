//*=================================================
//*               ASYNC-AWAIT
//*=================================================
//? Async-Await ECMAScript 2017 ile Javascript diline eklenmistir.
//? Aslinda Promise yapisinin syntax olarak basitlestirilmis halidir.
//? Bu baglamda sentetik seker benzetmesi yapilabilir.

//* Bir fonskiyonu asenkron hale getirmek icin fonksiyon keyword'nun onune
//* async keyword'u eklenir.

//* Bir async fonksiyon icerisinde await keyword'u ile yapilan istegin cevabinin
//* beklenmesi saglanir.

//* Aslinda dizilis olarak senkron mantiga benzeyen kod yazarak Asenkron
//* kod yazmayı mumkun kilar.

//* Await, promise-temelli herhangi bir fonksiyonun onune getirilerek getirildigi
//* satirdaki kodun durudurulmasini saglar. Yapilan istek yerine getirilip sonuc
//* degerlerinin dondurulmesine ile kodun calismasi devam eder.

let isError = false;

const getNews = async function () {  //!asenkron yapmak için yazılan kod async
  const API_KEY = "22f752eafc374a55b0ab9a5bc2300968";
  const url =
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=" + API_KEY;


  //! try - catch : try-hatayı beklediğimiz yer   catch-hatayı gördüğümüz yer

  try {
    const res = await fetch(url);   //!  asenkron yapıdan gelen işlemleri değişkene aktarmak içim await kullanılır
    if (!res.ok) {
      //   throw new Error(`Something went wrong: ${res.status}`);
      isError = true;
    }
    const data = await res.json(); //! gelen cevabı json a çevir
    // console.log(data.articles);  //
    renderNews(data.articles);  //! gelen haberleri yakalamak için fonk yazıyoruz
  } catch (error) {
    console.log(error);
  }
};

const renderNews = (news) => {  //! değişkene atayıp haberleri yakalıyoruz
  console.log(news);
  const newsList = document.getElementById("news-list"); 
  if (isError) {
    newsList.innerHTML += `
    <h2>News can not be fetched</h2>
    <img src="./img/404.png" alt="" />
    `;
    return;
  }

  news.forEach((item) => {
    const { title, description, urlToImage, url } = item; //! dest
    newsList.innerHTML += `
    <div class="col-md-6 col-lg-4 col-xl-3>
        <div class="card">
        <img src="${
          urlToImage || "./img/default-img.png"  //! yoksa benim seçtiğim resmi kullan
        }" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${description}</p>
                <a href="${url}" target="_blank" class="btn btn-danger">Details</a>
                

            </div>
        </div>
    </div>`;
  });
};

window.addEventListener("load", getNews);


   //! target="_blank" tıkladığında yeni sayfada aç
