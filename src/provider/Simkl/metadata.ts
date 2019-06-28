import {metadataInterface, searchInterface} from "./../listInterface";
import * as helper from "./helper";

export class metadata implements metadataInterface{
  private xhr;

  id: number;
  simklId: number = NaN;
  readonly type: "anime"|"manga";

  private animeInfo;

  constructor(public malUrl:string){
    this.type = utils.urlPart(malUrl, 3);
    if(typeof malUrl !== 'undefined' && malUrl.indexOf("myanimelist.net") > -1){
      this.id = utils.urlPart(malUrl, 4);
    }else if(typeof malUrl !== 'undefined' && malUrl.indexOf("simkl.com") > -1){
      this.id = NaN;
      this.simklId = utils.urlPart(malUrl, 4);
    }else{
      this.id = NaN;
    }
    return this;
  }

  async init(){
    con.log('Update Simkl info', this.id? 'MAL: '+this.id : 'Simkl: '+this.simklId);

    if(isNaN(this.id)){
      var de = {simkl: this.simklId};
    }else{
      //@ts-ignore
      var de = {mal: this.id};
    }

    if(isNaN(this.simklId)){
      var el = await helper.call('https://api.simkl.com/search/id', de, true);
      if(!el) throw 'Anime not found';
      con.error(el);
      this.simklId = el[0].ids.simkl;
    }

    return helper.call('https://api.simkl.com/anime/'+this.simklId, {'extended': 'full'}, true).then((res) => {
      con.log(res);
      this.animeInfo = res;
      return this;
    })
  };

  getTitle(){
    var title = '';
    try{
      title = this.animeInfo.title;
    }catch(e) {console.log('[iframeOverview] Error:',e);}
    return title;
  }

  getDescription(){
    var description = '';
    try{
      description = this.animeInfo.overview;
    }catch(e) {console.log('[iframeOverview] Error:',e);}
    return description;
  }

  getImage(){
    var image = '';
    try{
      image = 'https://simkl.in/posters/'+this.animeInfo.poster+'_ca.jpg';
    }catch(e) {console.log('[iframeOverview] Error:',e);}
    return image;
  }

  getAltTitle(){
    var altTitle: string[] = [];
    try{
      if(typeof this.animeInfo.en_title !== undefined && this.animeInfo.en_title) altTitle.push(this.animeInfo.en_title);
    }catch(e) {console.log('[iframeOverview] Error:',e);}
    return altTitle;
  }

  getCharacters(){
    var charArray:any[] = [];
    try{

    }catch(e) {console.log('[iframeOverview] Error:',e);}
    return charArray;
  }

  getStatistics(){
    var stats: any[] = [];
    try{
      if(this.animeInfo.ratings.simkl.rating !== null) stats.push({
        title: 'Score:',
        body: this.animeInfo.ratings.simkl.rating
      });
      if(typeof this.animeInfo.ratings.mal !== 'undefined' && this.animeInfo.ratings.mal.rating !== null) stats.push({
        title: 'MAL Score:',
        body: this.animeInfo.ratings.mal.rating
      });

      if(typeof this.animeInfo.rank !== 'undefined' && this.animeInfo.rank !== null) stats.push({
        title: 'Ranked:',
        body: '#'+this.animeInfo.rank
      });
      if(this.animeInfo.ratings.simkl.votes !== null) stats.push({
        title: 'Votes:',
        body: this.animeInfo.ratings.simkl.votes
      });

    }catch(e) {console.log('[iframeOverview] Error:',e);}
    return stats;
  }

  getInfo(){
    var html: any[] = [];
    try{


    }catch(e) {console.log('[iframeOverview] Error:',e);}
    return html;
  }

  getOpeningSongs(){
    var openingSongs = [];

    try{

    }catch(e) {console.log('[iframeOverview] Error:',e);}

    return openingSongs;
  }

  getEndingSongs(){
    var endingSongs = [];

    try{

    }catch(e) {console.log('[iframeOverview] Error:',e);}

    return endingSongs;
  }

  getRelated(){
    var html = '';
    var el:{type: string, links: {url: string, title: string, statusTag: string}[]}[] = [];
    var links: any = {};
    try{

    }catch(e) {console.log('[iframeOverview] Error:',e);}
    return el;
  }

}

export function search(keyword, type: "anime"|"manga", options = {}, sync = false): searchInterface{
  var resItems:any = [];
  return resItems;
  /*return api.request.xhr('GET', {
    url: 'https://kitsu.io/api/edge/'+type+'?filter[text]='+keyword+'&page[limit]=10&page[offset]=0&include=mappings,mappings.item&fields['+type+']=id,slug,titles,averageRating,startDate,posterImage,subtype',
    headers: {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
    },
    data: {},
  }).then((response) => {
    var res = JSON.parse(response.responseText);
    con.log('search',res);

    var resItems:any = [];
    j.$.each(res.data, function( index, item ) {
      var malId = null;
      for (var k = 0; k < res.included.length; k++) {
        var mapping = res.included[k];
        if(mapping.type == 'mappings'){
          if(mapping.attributes.externalSite === 'myanimelist/'+type){
            if(mapping.relationships.item.data.id == item.id){
              malId = mapping.attributes.externalId;
              res.included.splice(k, 1);
              break;
            }
          }
        }
      }

      resItems.push({
        id: item.id,
        name: helper.getTitle(item.attributes.titles),
        url: 'https://kitsu.io/'+type+'/'+item.attributes.slug,
        malUrl: (malId) ? 'https://myanimelist.net/'+type+'/'+malId : null,
        image: (item.attributes.posterImage && typeof item.attributes.posterImage.tiny !== "undefined")? item.attributes.posterImage.tiny : "",
        media_type: item.attributes.subtype,
        score: item.attributes.averageRating,
        year: item.attributes.startDate
      })
    });
    return resItems;
  });*/
};
