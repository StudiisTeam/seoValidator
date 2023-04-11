import { Paper, ContentAssessor } from "yoastseo";
import SEOAssessor from 'yoastseo/src/seoAssessor';
import Presenter from "./presenter/presenter";

export default class ValidatorController {
  yoastFormSubmit(data){
    const paper = new Paper(data.text, {
      keyword: data.keyword,
      title: data.title,
      description: data.description,
      url: data.url,
      metaDescription: data.metaDescription,
      titleWidth: data.titleWidth,
      locale: data.en_locale,
      permalink: data.permalink
    });

    const contentAssessor = new ContentAssessor(this.i18n());
    const seoAssessor = new SEOAssessor(this.i18n());

    contentAssessor.assess(paper);
    seoAssessor.assess(paper);

    const final_scores = this.getScores(seoAssessor, contentAssessor);
    return {
      seo: final_scores.seo,
      content: final_scores.content
    }
  }
   
  getScores(seoAssessor, contentAssessor) {
    return {
      seo: new Presenter().getScoresWithRatings(seoAssessor),
      content: new Presenter().getScoresWithRatings(contentAssessor)
    }
  }
  
  // getScoresAsHTML(scores) {
  //   return new Presenter().getScoresAsHTML(h, scores);
  // }

  //internacionalization
  i18n() {
    //Gettext Style i18n for Modern JavaScript Apps
    return new Jed({
      domain: `js-text-analysis`,
      locale_data: {
        "js-text-analysis": { "": {} }
      }
    })
  }
}