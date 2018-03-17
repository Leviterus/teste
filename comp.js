function cmp(listWebMaq, listWebUsr){
	var qtdListMaq= listWebMaq.length;
	var qtdListUsr= listWebUsr.length;
	for(i=0;i<qtdListMaq;i++){
		for(j=0;j<qtdListUsr;j++){
			if(listWebMaq[i].name == listWebUsr[j].name && listWebMaq[i].ip== listWebUsr[j].ip){
				acertos++;
			}
		}
	}

	if(qtdListUsr> qtdListMaq){
		total = qtdListUsr;
	}
	else{
		total = qtdListMaq;
	}
	nota = (acertos/total) *100 ;
	if(nota<=45){
		retorno =1
	}
	else if(nota <=60){
		retorno = 2
	}
	else{
		retorno = 3
	}
	console.log(retorno);
	console.log(nota);
}