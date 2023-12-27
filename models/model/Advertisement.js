class Advertisement {
    constructor(id, title, description, cost, imageUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.cost = cost;
        this.imageUrl = imageUrl;
    }

    get id() {return this.id;}

    set id(id) {this.id = id;}

    equals(other) {
        if (other == null) {
            return false;
        }

        if (!(other instanceof Advertisement)) {
            return false;
        }

        return this.id === other.id;
    }
}
