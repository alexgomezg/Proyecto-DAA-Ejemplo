package es.uvigo.esei.daa.entities;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

import nl.jqno.equalsverifier.EqualsVerifier;
import nl.jqno.equalsverifier.Warning;

public class PetUnitTest {
	@Test
	public void testPetIntStringString() {
		final int id = 1;
		final String name = "Casper";
		final String type = "Perro";
                final int peopleID = 1;
		
		final Pet pet = new Pet(id, name, type,peopleID);
		
		assertThat(pet.getId(), is(equalTo(id)));
		assertThat(pet.getName(), is(equalTo(name)));
		assertThat(pet.getType(), is(equalTo(type)));
                assertThat(pet.getPeopleID(), is(equalTo(peopleID)));
	}

	@Test(expected = NullPointerException.class)
	public void testPetIntStringStringNullName() {
		new Pet(1, null, "Perro",1);
	}
	
	@Test(expected = NullPointerException.class)
	public void testPersonIntStringStringNullType() {
		new Pet(1, "Casper",null,1);
	}
        
       /* public void testPersonIntStringStringNullPeopleID() {
		new Pet(1, "Casper","Type",null);
	}*/

	@Test
	public void testSetName() {
		final int id = 1;
		final String type = "Perro";
                final int peopleID = 1;
		
		final Pet pet = new Pet(id, "Casper", type,peopleID);
		pet.setName("Juan");
		
		assertThat(pet.getId(), is(equalTo(id)));
		assertThat(pet.getName(), is(equalTo("Juan")));
		assertThat(pet.getType(), is(equalTo(type)));
                assertThat(pet.getPeopleID(), is(equalTo(peopleID)));
	}

	@Test(expected = NullPointerException.class)
	public void testSetNullName() {
		final Pet pet = new Pet(1, "Casper", "Perro",1);
		
		pet.setName(null);
	}

	@Test
	public void testSetType() {
		final int id = 1;
		final String name = "Casper";
                final int peopleID = 1;
		
		final Pet pet = new Pet(id,name,"Perro",peopleID);
		pet.setType("Gato");
		
		assertThat(pet.getId(), is(equalTo(id)));
		assertThat(pet.getName(), is(equalTo(name)));
		assertThat(pet.getType(), is(equalTo("Gato")));
                assertThat(pet.getPeopleID(), is(equalTo(peopleID)));
	}

	@Test(expected = NullPointerException.class)
	public void testSetNullType() {
		final Pet pet = new Pet(1, "Casper", "Perro",1);
		
		pet.setType(null);
	}
        
        @Test
	public void testSetPeopleID() {
		final int id = 1;
		final String name = "Casper";
                final String type = "Gato";
		
		final Pet pet = new Pet(id,name,type,1);
		pet.setPeopleID(2);
		
		assertThat(pet.getId(), is(equalTo(id)));
		assertThat(pet.getName(), is(equalTo(name)));
		assertThat(pet.getType(), is(equalTo(type)));
                assertThat(pet.getPeopleID(), is(equalTo(2)));
	}

	@Test
	public void testEqualsObject() {
		final Pet petA = new Pet(1, "Name A", "Type A",1);
		final Pet petB = new Pet(1, "Name B", "Type B",1);
		
		assertTrue(petA.equals(petB));
	}

	@Test
	public void testEqualsHashcode() {
		EqualsVerifier.forClass(Pet.class)
			.withIgnoredFields("name", "type","peopleID")
			.suppress(Warning.STRICT_INHERITANCE)
			.suppress(Warning.NONFINAL_FIELDS)
		.verify();
	}
}
