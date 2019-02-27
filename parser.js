/**
 * Created by nastia on 27/02/2019.
 */
"use strict";

function readFile(file)
{
    return new Promise(function (fulfill, reject) {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    var data = rawFile.responseText.split('\n'),
                        input = data[0].split(' '),
                        inputObject = {
                            rows: input[0],
                            columns: input[1],
                            minIngradients: input[2],
                            maxPeaceSize: input[3]
                        },
                        pizza = data.splice(1, data.length - 2);

                    pizza.map((el, index) => {
                        pizza[index] = el.split('');
                    });

                    fulfill( {inputObject, pizza} );
                }
            }
        };
        rawFile.send(null);
    });
}

function parsePizza({ inputObject, pizza })
{
    //todo parse pizza
    let {rows, columns, minIngradients, maxPeaceSize} = inputObject,
        results = [];

    for (let i in pizza) {
        let start = 0, end = 0, m = 0, t = 0;
        while ( end < columns ) {
            if (pizza[i][end] == 'M') {
                m++;
            } else if (pizza[i][end] == 'T') {
                t++;
            }

            end++;

            if(end - start > maxPeaceSize) {
                if (pizza[i][start] == 'M') {
                    m--;
                } else if (pizza[i][start] == 'T') {
                    t--;
                }

                start++;
            }

            if(end - start <= maxPeaceSize && m >= minIngradients && t >= minIngradients) {
                results.push([i, start, i, end - 1]);
                start = end;
                m = 0;
                t = 0;
            }
        }
    }

    console.log(results);
}

function getChunks(fileName) {
    readFile(fileName)
        .then(function(result) {
            parsePizza(result);
        });
}

getChunks('a_example.in');
getChunks('b_small.in');
getChunks('c_medium.in');
getChunks('d_big.in');