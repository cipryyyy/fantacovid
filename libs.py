import requests
from bs4 import BeautifulSoup as BS

def table_gen(src="https://github.com/pcm-dpc/COVID-19/blob/master/dati-json/dpc-covid19-ita-andamento-nazionale-latest.json"):
    table=[]
    switch=0
    response=requests.get(src)
    soup = BS(response.content, "lxml")
    rows = soup.find_all("tr")
    for row in rows:
        cell = row.find_all("td")
        span = cell[1].find_all("span", class_=["pl-s", "pl-c1"])
        pack = []
        for text in span:
            switch += 1
            try:
                data = int(text.text.replace('"', ''))
            except ValueError:
                data = text.text.replace('"', '')
                
            pack.append(data)
            if switch == 2:
                switch = 0
                table.append(pack)
                break
    return table

def today():
    table=table_gen()
    for row in table:
        if row[0]=="nuovi_positivi":
            return row[1]
        
def closest(bets, target=today()):
    minimum = float('inf')
    for bet in bets:
        if abs(target-bet)<minimum:
            minimum = bet
    return bet

if __name__=="__main__":
    print(*table_gen(), sep="\n")
    today=today()
    print(f"I casi di oggi sono {today}")
    
    bets = [21321, 22580, 19000, 22838, 19987, 22000]
    players = ["u1", "u2", "u3", "u4", "u5", "u6"]
    winner = closest(bets)
    print(winner)
    print(f"Il vincitore è {players[bets.index(winner)]} con {winner} casi!\n\nTotale casi di oggi: {today}\nScarto: {abs(today-winner)}")
