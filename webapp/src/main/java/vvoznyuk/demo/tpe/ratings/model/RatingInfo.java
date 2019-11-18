package vvoznyuk.demo.tpe.ratings.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RatingInfo {
    private byte rating;
    private VideoType type;
    private String state; // country state (US only for demo)
    private long ts; // timestamp
}
