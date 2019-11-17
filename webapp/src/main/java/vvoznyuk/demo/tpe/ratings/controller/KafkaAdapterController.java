package vvoznyuk.demo.tpe.ratings.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vvoznyuk.demo.tpe.ratings.eventbus.RatingsEventBusService;
import vvoznyuk.demo.tpe.ratings.model.RatingInfo;
import vvoznyuk.demo.tpe.ratings.model.VideoType;

import java.util.List;

import static java.util.Arrays.asList;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class KafkaAdapterController {

    @Autowired
    RatingsEventBusService ratingsEventBusService;

    @RequestMapping(value="/rating/produce", method = POST)
    public void produceRating(@RequestBody RatingInfo rating) {
        // Double json-object-json conversion. Leave it for now, at least we verify JSON validity using Spring REST.
        // For heavy data JSON should not be used.
        ratingsEventBusService.sendMessage(JsonUtils.toJson(rating));
    }

    @RequestMapping(value="/rating/consume", method = POST)
    public List<RatingInfo> consumeRating() {
        // TODO
        return asList(
                new RatingInfo((byte)5, VideoType.MOVIE, "NY"),
                new RatingInfo((byte)4, VideoType.TV_SERIES, "LA")
                );
    }

}
