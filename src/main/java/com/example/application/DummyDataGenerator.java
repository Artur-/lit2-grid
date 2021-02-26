package com.example.application;

import java.time.LocalDateTime;

import com.example.application.data.Person;
import com.example.application.data.PersonRepository;
import com.vaadin.flow.spring.annotation.SpringComponent;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.vaadin.artur.exampledata.DataType;
import org.vaadin.artur.exampledata.ExampleDataGenerator;

@SpringComponent

public class DummyDataGenerator {
    @Bean
    public CommandLineRunner loadData(PersonRepository repo) {
        return args -> {
            ExampleDataGenerator<Person> gen = new ExampleDataGenerator<>(Person.class, LocalDateTime.now());
            gen.setData(Person::setId, DataType.ID);
            gen.setData(Person::setFirstName, DataType.FIRST_NAME);
            gen.setData(Person::setLastName, DataType.LAST_NAME);
            gen.setData(Person::setBirthDate, DataType.DATE_OF_BIRTH);
            repo.saveAll(gen.create(1000, 1));
        };
    }

}
