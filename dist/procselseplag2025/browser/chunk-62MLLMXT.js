import{G as o,H as l,J as m}from"./chunk-GBZCZK63.js";import{Z as i,da as r,j as c,k as n}from"./chunk-DXFUJXF7.js";var P=(()=>{class e{constructor(){this._carregandoListaPessoas$=new n(!1),this._listaPessoas$=new n({})}get carregandoListaPessoas$(){return this._carregandoListaPessoas$.asObservable()}set carregandoListaPessoas(s){this._carregandoListaPessoas$.next(s)}get carregandoListaPessoas(){return this._carregandoListaPessoas$.value}get listaPessoas$(){return this._listaPessoas$.asObservable()}set listaPessoas(s){sessionStorage.setItem("lista",JSON.stringify(s)),this._listaPessoas$.next(s)}get listaPessoas(){return Object.keys(this._listaPessoas$.value).length===0&&(this.listaPessoas=JSON.parse(sessionStorage.getItem("lista"))),this._listaPessoas$.value}static{this.\u0275fac=function(a){return new(a||e)}}static{this.\u0275prov=i({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();var L=(()=>{class e{constructor(){this._abitusService=r(l),this._painelPessoasState=r(P),this._utilService=r(m),this.carregandoListaPessoas$=this._painelPessoasState.carregandoListaPessoas$,this.listaPessoas$=this._painelPessoasState.listaPessoas$}carregaListaPessoas(s){this._painelPessoasState.carregandoListaPessoas=!0,this._abitusService.listaPessoas(s).subscribe({next:a=>{this._painelPessoasState.listaPessoas=a},error:()=>this._utilService.mensagem(o.ERROR,"Erro ao carregar a lista das pessoas!"),complete:()=>{this._painelPessoasState.carregandoListaPessoas=!1}})}getPessoa(s){return this._painelPessoasState.listaPessoas.content.find(a=>a.id===s)}salvaInformacoes(s,a){let t=new c;return this._abitusService.salvaInformacoes(s,a).subscribe({error:u=>{this._utilService.mensagem(o.ERROR,`Erro ao salvar as informa\xE7\xF5es da pessoa: ${u.message}`),t.next(!1),t.complete()},complete:()=>{this._utilService.mensagem(o.SUCCESS,"Informa\xE7\xF5es salvas com sucesso!"),t.next(!0),t.complete()}}),t}static{this.\u0275fac=function(a){return new(a||e)}}static{this.\u0275prov=i({token:e,factory:e.\u0275fac,providedIn:"root"})}}return e})();export{L as a};
