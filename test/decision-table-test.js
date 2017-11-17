/**
 * 
 * ©2016-2017 EdgeVerve Systems Limited (a fully owned Infosys subsidiary),
 * Bangalore, India. All Rights Reserved.
 * 
 */
var chalk = require('chalk');
var bootstrap = require('./bootstrap');
var expect = bootstrap.chai.expect;
var models = bootstrap.models;
var app = bootstrap.app;
var chai = require('chai');
chai.use(require('chai-things'));

var ruleEngineConfigData = {
    "key": "businessRuleEngine",
    "value": {
        "engine": "DROOLS"
    }
}

var payload = {
    "countries": ["Australia", "India", "USA", "UK"]
};

describe(chalk.blue('Decision Table Create - Drools'), function () {
    this.timeout(600000);

    after('cleaning up', function (done) {
        models.DocumentData.destroyAll({}, bootstrap.defaultContext, function (err, result) {
            models.DecisionTable.destroyAll({}, bootstrap.defaultContext, function (err, result) {
                done();
            });
        });
    });

    it('Should fail to create decision table as DROOLs is not configured', function (done) {
        var decisionTableData = {
            "name": "sample",
            "document": {
                "documentName": "sample.xlsx",
                "documentData": "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,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"
            }
        }
        models.SystemConfig.create(ruleEngineConfigData, bootstrap.defaultContext, function (err, res) {
            if (err) {
                return done(err);
            }
            models.DecisionTable.create(decisionTableData, bootstrap.defaultContext, function (err, result) {
                expect(err).not.to.be.undefined;
                expect(err.code).to.equal('ECONNREFUSED');
                expect(err.errno).to.equal('ECONNREFUSED');
                models.SystemConfig.destroyAll({}, bootstrap.defaultContext, function (err, result) {
                    done(err);
                });
            });
        });
    });

    it('Should sucessfully create decision table but fail to execute it', function (done) {
        var decisionTableData = {
            "name": "sample",
            "document": {
                "documentName": "sample.xlsx",
                "documentData": "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,UEsDBBQABgAIAAAAIQBBN4LPbgEAAAQFAAATAAgCW0NvbnRlbnRfVHlwZXNdLnhtbCCiBAIooAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACsVMluwjAQvVfqP0S+Vomhh6qqCBy6HFsk6AeYeJJYJLblGSj8fSdmUVWxCMElUWzPWybzPBit2iZZQkDjbC76WU8kYAunja1y8T39SJ9FgqSsVo2zkIs1oBgN7+8G07UHTLjaYi5qIv8iJRY1tAoz58HyTulCq4g/QyW9KuaqAvnY6z3JwlkCSyl1GGI4eINSLRpK3le8vFEyM1Ykr5tzHVUulPeNKRSxULm0+h9J6srSFKBdsWgZOkMfQGmsAahtMh8MM4YJELExFPIgZ4AGLyPdusq4MgrD2nh8YOtHGLqd4662dV/8O4LRkIxVoE/Vsne5auSPC/OZc/PsNMilrYktylpl7E73Cf54GGV89W8spPMXgc/oIJ4xkPF5vYQIc4YQad0A3rrtEfQcc60C6Anx9FY3F/AX+5QOjtQ4OI+c2gCXd2EXka469QwEgQzsQ3Jo2PaMHPmr2w7dnaJBH+CW8Q4b/gIAAP//AwBQSwMEFAAGAAgAAAAhALVVMCP0AAAATAIAAAsACAJfcmVscy8ucmVscyCiBAIooAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACskk1PwzAMhu9I/IfI99XdkBBCS3dBSLshVH6ASdwPtY2jJBvdvyccEFQagwNHf71+/Mrb3TyN6sgh9uI0rIsSFDsjtnethpf6cXUHKiZylkZxrOHEEXbV9dX2mUdKeSh2vY8qq7iooUvJ3yNG0/FEsRDPLlcaCROlHIYWPZmBWsZNWd5i+K4B1UJT7a2GsLc3oOqTz5t/15am6Q0/iDlM7NKZFchzYmfZrnzIbCH1+RpVU2g5abBinnI6InlfZGzA80SbvxP9fC1OnMhSIjQS+DLPR8cloPV/WrQ08cudecQ3CcOryPDJgosfqN4BAAD//wMAUEsDBBQABgAIAAAAIQCBPpSX8wAAALoCAAAaAAgBeGwvX3JlbHMvd29ya2Jvb2sueG1sLnJlbHMgogQBKKAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACsUk1LxDAQvQv+hzB3m3YVEdl0LyLsVesPCMm0KdsmITN+9N8bKrpdWNZLLwNvhnnvzcd29zUO4gMT9cErqIoSBHoTbO87BW/N880DCGLtrR6CRwUTEuzq66vtCw6acxO5PpLILJ4UOOb4KCUZh6OmIkT0udKGNGrOMHUyanPQHcpNWd7LtOSA+oRT7K2CtLe3IJopZuX/uUPb9gafgnkf0fMZCUk8DXkA0ejUISv4wUX2CPK8/GZNec5rwaP6DOUcq0seqjU9fIZ0IIfIRx9/KZJz5aKZu1Xv4XRC+8opv9vyLMv072bkycfV3wAAAP//AwBQSwMEFAAGAAgAAAAhAOyXfRk3AgAAjQQAAA8AAAB4bC93b3JrYm9vay54bWysVMtu2zAQvBfoPxC8O3pEihPBUpDYLhqgCII0j4uBYk1RFmE+VJKqHRT9966kqnXrS4r2Ii7J1XBnZsnZ5V5J8oVbJ4zOaXQSUsI1M6XQm5w+PrybnFPiPOgSpNE8py/c0cvi7ZvZztjt2pgtQQDtclp732RB4FjNFbgT03CNO5WxCjxO7SZwjeVQuppzr2QQh+FZoEBoOiBk9jUYpqoE4wvDWsW1H0Asl+CxfFeLxo1oir0GToHdts2EGdUgxFpI4V96UEoUy2422lhYS6S9j9IRGcMjaCWYNc5U/gShgqHII75RGETRQLmYVULyp0F2Ak1zC6o7RVIiwfllKTwvc3qGU7Pjvy3YtrluhcTdKEnikAbFTyvuLCl5Ba30D2jCCI+J6Wkcx10mkrqSnlsNns+N9qjhD/X/Va8ee14bdIfc88+tsBybopOtmOEXWAZrdwe+Jq2VOZ1nq0eH9FcO1Fr4Tyi/hdWCu603zepAajj28S/EBtaxDpD2UNoQ/ylBMesa+UnwnfslZjcl+2ehS7PLKV6Ll4N41y8/i9LXOY3D5AL3h7X3XGxqn9PpNE37sw+g+9bHI/qR6N7yj911iPCOdeNN5yolNhMY2Jsy6hHG3xhIhhZ3Q5+YxmnUZ/C9/+B8McMR1RU5/Rol4dU0vEgm4fI0nSTnF/HkPDmNJ/NkES/T6XKxvE6//d+GRpOz8U3oqqzB+gcLbIsvyT2vrsFhgw+EsE40Yqw6GP8qvgMAAP//AwBQSwMEFAAGAAgAAAAhAPqfyVoUAQAA9gEAABQAAAB4bC9zaGFyZWRTdHJpbmdzLnhtbHSRz2rCQBDG74W+w7CnCOqaHkqRJCJCH6BoL6WHbTLGLZvZdGe2KOK7d2tBStDjfL/55m+x2HcOvjGw9VSqfDpTgFT7xlJbqs36efKkgMVQY5wnLNUBWS2q+7uCWSB5iUu1E+nnWnO9w87w1PdIiWx96IykMLSa+4Cm4R2idE4/zGaPujOWFNQ+kqS+uYJI9ivi6iJUBduqkGrlqbGSxiu0VIX+Ff/Asr6mvkSHa/PhcJg+GQomBHNY1jUyD1GL8mpcxKUMyTbSuW2W3GOw1OB+BLgXDGQcHD8Z5nBk25KRGDAFqkl3yyg6N4bkeTtb3kfqdBqW3tyeIjvfKVjkMeSjYd4FXgeH/1vo9LfqBwAA//8DAFBLAwQUAAYACAAAACEAO20yS8EAAABCAQAAIwAAAHhsL3dvcmtzaGVldHMvX3JlbHMvc2hlZXQxLnhtbC5yZWxzhI/BisIwFEX3A/5DeHuT1oUMQ1M3IrhV5wNi+toG25eQ9xT9e7McZcDl5XDP5Tab+zypG2YOkSzUugKF5GMXaLDwe9otv0GxOOrcFAktPJBh0y6+mgNOTkqJx5BYFQuxhVEk/RjDfsTZsY4JqZA+5tlJiXkwyfmLG9Csqmpt8l8HtC9Ote8s5H1Xgzo9Uln+7I59Hzxuo7/OSPLPhEk5kGA+okg5yEXt8oBiQet39p5rfQ4Epm3My/P2CQAA//8DAFBLAwQUAAYACAAAACEAi4JuWJMGAACOGgAAEwAAAHhsL3RoZW1lL3RoZW1lMS54bWzsWc+LGzcUvhf6Pwxzd/xrZmwv8QZ7bGfb7CYh66TkqLVlj7KakRnJuzEhUJJjoVCall4KvfVQ2gYS6CX9a7ZNaVPIv9AnzdgjreVumm4gLVnDMqP59PTpvTffkzQXL92NqXOEU05Y0narFyqug5MRG5Nk2nZvDgelputwgZIxoizBbXeBuXtp+/33LqItEeEYO9A/4Vuo7UZCzLbKZT6CZsQvsBlO4NmEpTEScJtOy+MUHYPdmJZrlUpQjhFJXCdBMZi9NpmQEXaG0qS7vTTep3CbCC4bRjTdl6ax0UNhx4dVieALHtLUOUK07cI4Y3Y8xHeF61DEBTxouxX155a3L5bRVt6Jig19tX4D9Zf3yzuMD2tqzHR6sBrU83wv6KzsKwAV67h+ox/0g5U9BUCjEcw046Lb9Lutbs/PsRoou7TY7jV69aqB1+zX1zh3fPkz8AqU2ffW8INBCF408AqU4X2LTxq10DPwCpThgzV8o9LpeQ0Dr0ARJcnhGrriB/VwOdsVZMLojhXe8r1Bo5YbL1CQDavskkNMWCI25VqM7rB0AAAJpEiQxBGLGZ6gEWRxiCg5SImzS6YRJN4MJYxDc6VWGVTq8F/+PHWlPIK2MNJ6S17AhK81ST4OH6VkJtruh2DV1SAvn33/8tkT5+WzxycPnp48+Onk4cOTBz9mtoyOOyiZ6h1ffPvZn19/7Pzx5JsXj76w47mO//WHT375+XM7ECZbeOH5l49/e/r4+Vef/v7dIwu8k6IDHT4kMebOVXzs3GAxzE15wWSOD9J/1mMYIWL0QBHYtpjui8gAXl0gasN1sem8WykIjA14eX7H4LofpXNBLCNfiWIDuMcY7bLU6oArcizNw8N5MrUPns513A2EjmxjhygxQtufz0BZic1kGGGD5nWKEoGmOMHCkc/YIcaW2d0mxPDrHhmljLOJcG4Tp4uI1SVDcmAkUtFph8QQl4WNIITa8M3eLafLqG3WPXxkIuGFQNRCfoip4cbLaC5QbDM5RDHVHb6LRGQjub9IRzquzwVEeoopc/pjzLmtz7UU5qsF/QqIiz3se3QRm8hUkEObzV3EmI7sscMwQvHMypkkkY79gB9CiiLnOhM2+B4z3xB5D3FAycZw3yLYCPfZQnATdFWnVCSIfDJPLbG8jJn5Pi7oBGGlMiD7hprHJDlT2k+Juv9O1LOqdFrUOymxvlo7p6R8E+4/KOA9NE+uY3hn1gvYO/1+p9/u/16/N73L56/ahVCDhherdbV2jzcu3SeE0n2xoHiXq9U7h/I0HkCj2laoveVqKzeL4DLfKBi4aYpUHydl4iMiov0IzWCJX1Ub0SnPTU+5M2McVv6qWW2J8Snbav8wj/fYONuxVqtyd5qJB0eiaK/4q3bYbYgMHTSKXdjKvNrXTtVueUlA9v0nJLTBTBJ1C4nGshGi8Hck1MzOhUXLwqIpzS9DtYziyhVAbRUVWD85sOpqu76XnQTApgpRPJZxyg4FltGVwTnXSG9yJtUzABYTywwoIt2SXDdOT84uS7VXiLRBQks3k4SWhhEa4zw79aOT84x1qwipQU+6Yvk2FDQazTcRaykip7SBJrpS0MQ5brtB3YfTsRGatd0J7PzhMp5B7nC57kV0CsdnI5FmL/zrKMss5aKHeJQ5XIlOpgYxETh1KInbrpz+KhtoojREcavWQBDeWnItkJW3jRwE3QwynkzwSOhh11qkp7NbUPhMK6xPVffXB8uebA7h3o/Gx84Bnac3EKSY36hKB44JhwOgaubNMYETzZWQFfl3qjDlsqsfKaocytoRnUUoryi6mGdwJaIrOupu5QPtLp8zOHTdhQdTWWD/ddU9u1RLz2miWdRMQ1Vk1bSL6Zsr8hqroogarDLpVtsGXmhda6l1kKjWKnFG1X2FgqBRKwYzqEnG6zIsNTtvNamd44JA80SwwW+rGmH1xOtWfuh3OmtlgViuK1Xiq08f+tcJdnAHxKMH58BzKrgKJXx7SBEs+rKT5Ew24BW5K/I1Ilw585S03XsVv+OFNT8sVZp+v+TVvUqp6XfqpY7v16t9v1rpdWv3obCIKK762WeXAZxH0UX+8UW1r32AiZdHbhdGLC4z9YGlrIirDzDV2uYPMA4B0bkX1AateqsblFr1zqDk9brNUisMuqVeEDZ6g17oN1uD+65zpMBepx56Qb9ZCqphWPKCiqTfbJUaXq3W8RqdZt/r3M+XMTDzTD5yX4B7Fa/tvwAAAP//AwBQSwMEFAAGAAgAAAAhANCsMMHfAwAAXxMAAA0AAAB4bC9zdHlsZXMueG1s1Fhbj6M2FH6v1P+A/M5wCTAQAavNZJBW2laVZir11QGTWGtsBM5s0qr/fY8NBLLTbTPbXLQPUWxjn/Odi79jO363q5jxQpqWCp4g585GBuG5KChfJ+j358wMkdFKzAvMBCcJ2pMWvUt//ilu5Z6Rpw0h0gARvE3QRsp6blltviEVbu9ETTh8KUVTYQndZm21dUNw0apFFbNc2w6sClOOOgnzKj9FSIWbT9vazEVVY0lXlFG517KQUeXzD2suGrxiAHXneDgfZOvOK/EVzRvRilLegThLlCXNyWuUkRVZICmNS8Fla+Riy2WCXBCtNMw/cfGZZ+oTOLCflcbtn8YLZjDiICuNc8FEY0jwDADTIxxXpJvxgBldNVRNK3FF2b4bdtWAdmY/r6Jgmhq0FI4OTRqv1KyL69IqW9BJGTt44F4ZCwNpDJGQpOEZdIy+/byvwVQOSdNB1vP+Y/a6wXvH9U9f0ApGC4Vi/TB1sK0krI7HPGRIquJm391HURQ6QRiGkTdzPE972prYoFx8Ct5T1FNekB0pEhR42q4LqelT69w6tLzBk5czxR+DM4Pg3Pt+6DuR68FPb5a3INChg1RdiaYAXhu2q0rWbiiNGSklZEhD1xv1L0Wt8kVICSSQxgXFa8ExUzttWDFdCXwI1JcguQHqGrb2175RKnoNJ83XWI6hnLSuQ31z0CdhBT8Pbv6RbHtLbhxn1Q/llW4j3BTy4L037pirY+5pAUgmJ4w9KTr4ozwwjToD7EqDb6uskh+A+eFMpSr20ITK0jc7Vuk6im2m0jrZU7HBd8k1duVBwbdQOQCwRwVlckSljjj9agPXNdurU446v/Q9WDP2Fppvx/57Rte8It0CsO4El8xuqRxq0Gg5mPiV5ee2FXw7qgPDr+roI+VXifLlUyyN4RzdZZzxucH1M9npXFUba1eeI/8umu6Xz7jgCgn+rTDD5rodkwCn3U45eP2qyqHYjLzyyvIzkPSRglfWnbsKnDVxdIGFkjqp20dV+1B/DXU7T9Cv6u2CTQK42lIGt8h/qNggs9iNZwB9A5XqHUKfDg5awHkFKfGWyefDxwSN7V9IQbcVMHI/6zf6IqQWkaCx/VFdXJxA3SeB5D62cNOAf2Pb0AT99bi4j5aPmWuG9iI0vRnxzchfLE3fe1gsl1lku/bD35Nnkf/xKKIfb4BZHW/eMng6aXpje/BP41iCJp0Ovr4NA+wp9sgN7Pe+Y5vZzHZML8ChGQYz38x8x10G3uLRz/wJdv/7sDu25Tjdy5MC788lrQijfIjVEKHpKAQJuv9ihDVEwhpfxtIvAAAA//8DAFBLAwQUAAYACAAAACEADuVZJhMDAAD+BwAAGAAAAHhsL3dvcmtzaGVldHMvc2hlZXQxLnhtbJRVyW7bMBC9F+g/ELxHiyN5ESwHiIWgORQomi5nmqIsIpKokrSd9Os7XCw7clA4Fy2jx/f4Zoaj5d1L26A9k4qLLsdxEGHEOipK3m1z/PPHw80cI6VJV5JGdCzHr0zhu9XnT8uDkM+qZkwjYOhUjmut+ywMFa1ZS1QgetbBl0rIlmh4ldtQ9ZKR0i5qm3ASRdOwJbzDjiGT13CIquKUFYLuWtZpRyJZQzTsX9W8V0e2ll5D1xL5vOtvqGh7oNjwhutXS4pRS7PHbSck2TTg+yVOCD1y25cL+pZTKZSodAB0odvopedFuAiBabUsOTgwaUeSVTm+T7IijnC4WtoE/eLsoM6ekSabJ9YwqlkJdcLI5H8jxLMBPkIoAkplAYaSUM33bM2aBphnUMI/TmSWFTOjEQ4i589HwQdbtG8Slawiu0Z/F4cvjG9rDcopJMHkIitfC6YoFAG0g0lqWKlogAKuqOXQTRNIInmx9wMvdQ1PURAn0RTQiO6UFu1vF4/9arfu1q+Du18XJ8E8TZPpfPb/lYlfCXe/Mp0HySSdzeP3NUO3ZZuNgmiyWkpxQNCJwKB6Yvp6ksHz+5bBq8HeGzCkBs4OJENBIfarZBnuIbXUQ9Ye4oyaRYWPTGw5QHWQBovXSxuwlTbpN7xrH7m1KbVKPpJcKE0/omTAOYbr4DEdeXQI0yEDZPoWUnjIpWnTo1fn24DfmvaRM9M+cmnaDLSrlQzYHrfB0WRk2iGg1QdENPJ8iYgHRHhe+MVHdmbAtk0H3dloZw4Bh2hALEY7cwi4Doj4tPk3WzO9fX3WLDrHqT0JJ7OuP/1HqM+gejval4dA4gbIfJQyN8DckW2Z3NpZpxAVOzOQElAeoqf5apthHD+OxHE8zQo71Ebx9TSDLjYj9CS7WvZky74SueWdQg2r7EwEh9INzSgwbkVvJqWZYBuhYfYd32r4KTI4uVEAtaqE0McXEDG8T0zveiQkh1lr/3M57oXUknCNUQ3xvwI+NEXPc7yAOsHfXHN6FpAZhx+EfCzt9AmHP/fqHwAAAP//AwBQSwMEFAAGAAgAAAAhACuocbBRAQAAdQIAABEACAFkb2NQcm9wcy9jb3JlLnhtbCCiBAEooAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHySUUvDMBSF3wX/Q8l7m6adc4S2A5U9ORCsKL7F5G4ra9KQZHb796bdVisbPibn3C/nXJLN97IOvsHYqlE5IlGMAlC8EZVa5+itXIQzFFjHlGB1oyBHB7BoXtzeZFxT3hh4MY0G4yqwgScpS7nO0cY5TTG2fAOS2cg7lBdXjZHM+aNZY834lq0BJ3E8xRIcE8wx3AFDPRDRCSn4gNQ7U/cAwTHUIEE5i0lE8K/XgZH26kCvjJyycgftO53ijtmCH8XBvbfVYGzbNmrTPobPT/DH8vm1rxpWqtsVB1RkglNugLnGFK9MflUu2O4kM4FmzrAMj+RulTWzbum3vqpAPByuTly6/Bt9peNDIAIfkh4rnZX39PGpXKAiick0JElIJiVJ6ITQePbZhfgz34U+XshTlP+J92E8C+O0jKeUpDS9GxHPgCLDFx+l+AEAAP//AwBQSwMEFAAGAAgAAAAhAKQkI7wlAQAAEAQAACcAAAB4bC9wcmludGVyU2V0dGluZ3MvcHJpbnRlclNldHRpbmdzMS5iaW7sU8tKw0AUPakPihv9BPEPBOk+NoGmJCZNJhS7CdGMMBJnQjqB6sovFD/AD5Bu3Hand9p0I22hS8E7zJw7h8OZO68xOO7gYoZzOFC4R4Mn4iQ0MT4xOQqa19gc1iGOP3B10P96PbJgYX6iugXhKSboEK5Gnxw0te0+W+w30lbLGuxQN/hN8VvseDfpBRZUHfD2PnzctUa39VlrrKXzPlX9a//6CazfldnHgnoSsKHJz/CJ8R7/xJNVo6+FBIvtPgtjxG7i+D5SKWo+NVlYCy51roWSiMKYdB5DzKeqbJZcWBm4RJRXvE7EC4fvMubGiGoh9ajJS6GfWy4bpbbvsVv0VanqQBV8lWGQlw9aSY4ByyKbJd7EzXqzXhbsuqcfAAAA//8DAFBLAwQUAAYACAAAACEA9EJnyJABAAAYAwAAEAAIAWRvY1Byb3BzL2FwcC54bWwgogQBKKAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACckk1v2zAMhu8D+h8M3Rs53QeGQFYxpB06oMMCJG3PqkzHQmXJEFkj7q8fbSOps+20Gz9evHpIUV0fGp91kNDFUIjlIhcZBBtLF/aFeNh9v/wqMiQTSuNjgEL0gOJaX3xQmxRbSOQAM7YIWIiaqF1JibaGxuCC24E7VUyNIU7TXsaqchZuon1tIJC8yvMvEg4EoYTysj0Zislx1dH/mpbRDnz4uOtbBtbqW9t6Zw3xlPqnsylirCi7PVjwSs6bium2YF+To17nSs5TtbXGw5qNdWU8gpLvBXUHZljaxriEWnW06sBSTBm6N17blcieDcKAU4jOJGcCMdYgm5Ix9i1S0k8xvWANQKgkC6biGM6189h90stRwMG5cDCYQLhxjrhz5AF/VRuT6B/EyznxyDDxTjjbgW96c843jswv/eG9jk1rQq9/hCpiz2MdC+rehRd8aHfxxhAct3peVNvaJCj5I05bPxXUHS80+cFkXZuwh/Ko+bsx3MDjdOh6+XmRf8z5e2c1Jd9PWv8GAAD//wMAUEsBAi0AFAAGAAgAAAAhAEE3gs9uAQAABAUAABMAAAAAAAAAAAAAAAAAAAAAAFtDb250ZW50X1R5cGVzXS54bWxQSwECLQAUAAYACAAAACEAtVUwI/QAAABMAgAACwAAAAAAAAAAAAAAAACnAwAAX3JlbHMvLnJlbHNQSwECLQAUAAYACAAAACEAgT6Ul/MAAAC6AgAAGgAAAAAAAAAAAAAAAADMBgAAeGwvX3JlbHMvd29ya2Jvb2sueG1sLnJlbHNQSwECLQAUAAYACAAAACEA7Jd9GTcCAACNBAAADwAAAAAAAAAAAAAAAAD/CAAAeGwvd29ya2Jvb2sueG1sUEsBAi0AFAAGAAgAAAAhAPqfyVoUAQAA9gEAABQAAAAAAAAAAAAAAAAAYwsAAHhsL3NoYXJlZFN0cmluZ3MueG1sUEsBAi0AFAAGAAgAAAAhADttMkvBAAAAQgEAACMAAAAAAAAAAAAAAAAAqQwAAHhsL3dvcmtzaGVldHMvX3JlbHMvc2hlZXQxLnhtbC5yZWxzUEsBAi0AFAAGAAgAAAAhAIuCbliTBgAAjhoAABMAAAAAAAAAAAAAAAAAqw0AAHhsL3RoZW1lL3RoZW1lMS54bWxQSwECLQAUAAYACAAAACEA0Kwwwd8DAABfEwAADQAAAAAAAAAAAAAAAABvFAAAeGwvc3R5bGVzLnhtbFBLAQItABQABgAIAAAAIQAO5VkmEwMAAP4HAAAYAAAAAAAAAAAAAAAAAHkYAAB4bC93b3Jrc2hlZXRzL3NoZWV0MS54bWxQSwECLQAUAAYACAAAACEAK6hxsFEBAAB1AgAAEQAAAAAAAAAAAAAAAADCGwAAZG9jUHJvcHMvY29yZS54bWxQSwECLQAUAAYACAAAACEApCQjvCUBAAAQBAAAJwAAAAAAAAAAAAAAAABKHgAAeGwvcHJpbnRlclNldHRpbmdzL3ByaW50ZXJTZXR0aW5nczEuYmluUEsBAi0AFAAGAAgAAAAhAPRCZ8iQAQAAGAMAABAAAAAAAAAAAAAAAAAAtB8AAGRvY1Byb3BzL2FwcC54bWxQSwUGAAAAAAwADAAmAwAAeiIAAAAA"
            }
        }
        models.DecisionTable.create(decisionTableData, bootstrap.defaultContext, function (error, result) {
            if (error) {
                done(error);
            }
            models.SystemConfig.create(ruleEngineConfigData, bootstrap.defaultContext, function (sysErr, data) {
                if (sysErr) {
                    done(sysErr);
                }
                models.DecisionTable.exec("sample", payload, bootstrap.defaultContext, function (err, res) {
                    expect(err).not.to.be.undefined;
                    expect(err.code).to.equal('ECONNREFUSED');
                    expect(err.errno).to.equal('ECONNREFUSED');
                    models.SystemConfig.destroyAll({}, bootstrap.defaultContext, function (err, result) {
                        done(err);
                    });
                });
            });
        });
    });

    it('Should fail to create decision table as base64 validation of decision data is violated', function (done) {
        var decisionTableData = {
            "name": "sample",
            "document": {
                "documentName": "sample.xlsx",
                "documentData": "wrong decision data"
            }
        }
        models.DecisionTable.create(decisionTableData, bootstrap.defaultContext, function (err, res) {
            expect(err).not.to.be.undefined;
            expect(err.message).to.equal('Decision table data provided is not a base64 encoded string');
            done();
        });
    });

    it('Should fail to create decision table as decision data is not correct', function (done) {
        var decisionTableData = {
            "name": "sample",
            "document": {
                "documentName": "sample.xlsx",
                "documentData": "base64"
            }
        }
        models.DecisionTable.create(decisionTableData, bootstrap.defaultContext, function (err, res) {
            console.log(err);
            expect(err).not.to.be.undefined;
            expect(err.message).to.equal('Decision table data provided could not be parsed, please provide proper data');
            done();
        });
    });

    it('Should fail to execute decision table as decision table data is not proper', function (done) {
        models.DecisionTable.exec("invalidTableName", {}, bootstrap.defaultContext, function (err, res) {
            expect(err).not.to.be.undefined;
            expect(err.message).to.equal('No Document found for DocumentName invalidTableName');
            done();
        });
    });

});