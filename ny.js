const nyDataForm = document.getElementById('nyDataForm');

nyDataForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // returns number of record that the user input typeof number
    const numOfData = document.getElementById('numberRecord')

    // the term that the user wants to search typeof string
    const inputVal = document.getElementById('article');
    inputVal.value;

    // param1 string search term
    // param2 number how many data
    getData(inputVal.value, numOfData.value)
})

function getData(searchTerm, count) {

    //sample https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=fbc0aba5557746eeb16a65ae5e9a40ae&q=tesla&begin_date=20010811

    const url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";
    //'https://jsonplaceholder.typicode.com/posts/1'
    const param = ({
        'api-key': "fbc0aba5557746eeb16a65ae5e9a40ae",
        'q': searchTerm,
        // 'begin_date': "20010811", //format YYYYDDMM
        'count': count,
    });


    fetch(`${url}api-key=${param['api-key']}&q=${param.q}`)
        .then(response => response.json())
        .then(json => {
            // console.log(json.response.docs[0])
            displayData(param.count, json)
        }
        )
        .catch(err => console.log(err))

}

function displayData(loopCount, json) {
    const appendHere = document.getElementById('searchResultHeader');

    for (let i = 0; i < loopCount; i++) {
        console.log(json.response.docs[i].headline)
        appendHere.innerHTML += `
            <h2>${json.response.docs[i].headline.main}</h2>
            <h4>${json.response.docs[i].headline.print_headline}</h4>
            <p>${json.response.docs[i].snippet}</p>
            <h5>${json.response.docs[i].pub_date}</h5>
        `
    }
}


function clear() {
    $("searchResultHeader").empty();
  }
  