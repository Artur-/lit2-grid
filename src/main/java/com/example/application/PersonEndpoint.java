package com.example.application;

import java.time.LocalDateTime;
import java.util.List;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;

import org.vaadin.artur.exampledata.DataType;
import org.vaadin.artur.exampledata.ExampleDataGenerator;

@Endpoint
@AnonymousAllowed
public class PersonEndpoint {

    private List<Person> persons;
    {
        ExampleDataGenerator<Person> gen = new ExampleDataGenerator<>(Person.class, LocalDateTime.now());
        gen.setData(Person::setFirstName, DataType.FIRST_NAME);
        gen.setData(Person::setLastName, DataType.LAST_NAME);
        gen.setData(Person::setBirthDate, DataType.DATE_OF_BIRTH);
        persons = gen.create(100, 1);

    }

    public List<Person> list() {
        return persons;
    }
}
