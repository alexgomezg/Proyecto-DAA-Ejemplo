package es.uvigo.esei.daa.entities;

import static java.util.Objects.requireNonNull;

/**
 * An entity that represents a pet.
 *
 * @author Alex
 */
public class Pet {

    private int id;
    private String name;
    private String type;
    private int peopleID;

    Pet() {
    }

    public Pet(int id, String name, String type, int peopleID) {
        this.id = id;
        this.setName(name);
        this.setType(type);
        this.setPeopleID(peopleID);
    }

    public int getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = requireNonNull(type, "Name can't be null");
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = requireNonNull(name, "Name can't be null");
    }

    public int getPeopleID() {
        return peopleID;
    }

    public void setPeopleID(int peopleID) {
        this.peopleID = requireNonNull(peopleID, "PeopleID can't be null");
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + id;
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (!(obj instanceof Pet)) {
            return false;
        }
        Pet other = (Pet) obj;
        if (id != other.id) {
            return false;
        }
        return true;
    }
}
