package com.example.application.data;

import java.util.List;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.server.connect.auth.AnonymousAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.vaadin.artur.helpers.GridSorter;
import org.vaadin.artur.helpers.PagingUtil;

@Endpoint
@AnonymousAllowed
public class PersonEndpoint {

    @Autowired
    private PersonRepository repository;

    public List<Person> list(int offset, int limit, List<GridSorter> sortOrder) {
        Pageable pageable = PagingUtil.offsetLimitTypeScriptSortOrdersToPageable(offset, limit, sortOrder);
        return repository.findAll(pageable).getContent();
    }
}
