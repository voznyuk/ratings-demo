class App {
    constructor() {
        this.ratingsTextarea = $(".ratings-in");
        this.generateRatingsPanel = new GenerateRatingsPanel();
        this.bindEvents();
    }

    bindEvents() {
        $(".btn-submit-ratings").click(e => this.submitRatings());
    }

    submitRatings() {
        let ratingsStr = this.ratingsTextarea.val().trim();
        ratingsStr
            .split("\n")
            .map(r => JSON.parse(r.trim()))
            .forEach(r => this.submitOneRating(r));
        this.ratingsTextarea.empty();
    }

    submitOneRating(rating) {
        let options = {};
        axios
            .post('/rating/produce', rating, options)
            .then(response => {console.log(response.status);})
            .catch(error => {console.log(error);});
    }
}

class GenerateRatingsPanel {

    constructor() {
        this.panel = $(".generate-controls");
        this.textarea = $(".ratings-in");
        this.countDropdown = this.panel.find("select");
        this.ratingsGenerator = new RatingGenerator();
        this.bindEvents();
    }

    bindEvents() {
        $(".btn-generate-entries").click(e => this.generate());
    }

    generate() {
        let count = this.countDropdown.val();
        let ratings = this.ratingsGenerator.generate(count);
        let ratingsStr = ratings.map(r => JSON.stringify(r)).join("\n");
        this.textarea.text(ratingsStr);
    }
}

class RatingGenerator {

    constructor() {
        this.VIDEO_TYPES = ["MOVIE", "TV_SERIES", "VIDEO_CLIP"];
        this.US_STATE_ABBRS = [ "AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY" ];
    }

    generate(count) {
        let result = [];
        for (let i = 0; i < count; i++) {
            result.push(this.generateOne());
        }
        return result;
    }

    generateOne() {
        return {
            rating: RatingGenerator.generateRatingValue(),
            type: this.VIDEO_TYPES[getRandomInt(0, this.VIDEO_TYPES.length-1)],
            state: this.US_STATE_ABBRS[getRandomInt(0, this.US_STATE_ABBRS.length-1)],
            ts: getRandomInt(1546293600000, 1573768800000), /* [01/01/2019, 11/15/2019] */
        };
    }

    static generateRatingValue() {
        let r = getRandomInt(1, 5);
        // generate 4 & 5 with higher probability
        if (r <= 3 && Math.random() > 0.5) {
            r = getRandomInt(4, 5);
        }
        return r;
    }
}

$(document).ready(function() {
    window.app = new App();
});