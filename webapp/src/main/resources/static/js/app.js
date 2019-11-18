class App {
    constructor() {
        this.ratingsTextarea = $(".ratings-in");
        this.generateRatingsPanel = new GenerateRatingsPanel();
        this.ratingsWebSocket = new RatingsWebSocket(r => this.onRatingAdded(r));
        this.ratingsEchoPanel = new RatingsEchoPanel(this.ratingsWebSocket);
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
            .then(response => {console.log("Response status: " + response.status);})
            .catch(error => {alert(error);});
    }

    // data is echoed from Kafka topic
    onRatingAdded(ratingJson) {
        this.ratingsEchoPanel.onRatingAdded(ratingJson);
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

class RatingsEchoPanel {

    constructor(ratingsWebSocket) {
        this.ratingsWebSocket = ratingsWebSocket;
        this.resultDiv = $(".ratings-echo");
        this.bindEvents();
    }

    bindEvents() {
        $(".btn-clear-echo").click(e => this.clear());
    }

    clear() {
        this.resultDiv.empty();
    }

    onRatingAdded(ratingJson) {
        this.resultDiv.append($('<div>', {text: ratingJson}));
    }
}


class RatingsWebSocket {

    constructor(onRatingAdded) {
        this.onRatingAdded = onRatingAdded;
        this.connect();
    }

    connect() {
        let socket = new SockJS('/stomp-websocket');
        this.stompClient = webstomp.over(socket);
        this.stompClient.connect({}, (frame) => {
            console.log("Websocket connected");
            this.stompClient.subscribe('/topic/ratings/echo', (response) => {
                console.log("Received from websocket");
                this.onRatingAdded(response.body);
            });
        });
    }

    // not used
    sendRating(ratingJson) {
        this.stompClient.send("/dest/ratings", {}, ratingJson);
    }

}

$(document).ready(function() {
    window.app = new App();
});