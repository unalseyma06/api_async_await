//*=========================================================
//*                     FLAG-APP
//*=========================================================

const fetchContryByName = async (name) => {
  const url = `https://restcountries.com/v3.1/name/${name}`; 
  await fetch(url)
    .then((res) => {
      if (!res.ok) {
        renderError(`Something went wrong: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => renderCountries(data))
    .catch((err) => console.log(err));
};

const renderError = (msg) => {
  console.log(msg);
  const countryDiv = document.querySelector(".countries");
  countryDiv.innerHTML += `
    <h2>Countries can not fetched</h2>
    <img src="./img/404.png" alt="" />
`;
};

const renderCountries = (data) => {
  console.log(data);
  const countryDiv = document.querySelector(".countries");
  const {
    capital,
    currencies,
    flags: { svg },
    languages,
    name: { common },
    region,
  } = data[0];

  //   console.log(data[0].flags.svg);  //! normal kullanim
  //   console.log(svg) //! dest. edilmis kullanim

  //   console.log(Object.values(languages));
  //   console.log(Object.values(currencies)[0].name);
  //   console.log(Object.values(currencies)[0].symbol);
  console.log(
    Object.values(currencies).map((item) => Object.values(item) + " ")
  );

  countryDiv.innerHTML += `
        <div class="card mx-auto m-3" style="width: 18rem;">
            <img src="${svg}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${common}</h5>
                    <p class="card-text">${region}</p>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <i class="fas fa-lg fa-landmark"></i> 
                            ${capital}
                        </li>
                        <li class="list-group-item">
                            <i class="fas fa-lg fa-comments"></i>
                            ${Object.values(languages)}
                        </li>
                        <li class="list-group-item">
                            <i class="fas fa-lg fa-money-bill-wave"></i>
                            ${Object.values(currencies).map(
                              (item) => Object.values(item) + " "
                            )}
                        </li>
                    </ul>
                    </div>
        </div>`;
};

const inputValue = document.querySelector("#input-box");
const submitBtn = document.querySelector("#submit-button");

submitBtn.addEventListener("click", () => {
  fetchContryByName(inputValue.value);
});

fetchContryByName("japan");
fetchContryByName("turkey");
fetchContryByName("poland");
fetchContryByName("germany");
