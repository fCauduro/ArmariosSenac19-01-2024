const token = localStorage.getItem("token");

function docReady(fn) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

docReady(function () {
    let resultContainer = document.getElementById('qr-reader-results');
    let lastResult, countResults = 0;

    async function getarmarios(urlapi) {
        try {
            console.log('Fetching data from:', urlapi);

            const response = await fetch(urlapi, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status);
            }

            const getarmarios = await response.json();
            console.log('Data received:', getarmarios);
            localStorage.setItem('getarmarios', JSON.stringify(getarmarios));

            window.location.href = '../armario/index.html'; 
        } catch (error) {
            console.error('Error:', error.message);
        }
    }

    function onScanSuccess(decodedText, decodedResult) {
        const url = "https://www.armariosapi.somee.com/api/Armarios/";
        const urlapi = url + decodedText;
        console.log(urlapi);

        if (decodedText !== lastResult) {
            ++countResults;
            lastResult = decodedText;

            console.log(decodedText);
            getarmarios(urlapi);
        }
    }

    var html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 });
    html5QrcodeScanner.render(onScanSuccess);
});
