package com.mysabr.api.dbhelpers;


import com.mysabr.api.handlers.lookups.educatorroles.EducatorRoleLookupDao;
import com.mysabr.api.handlers.profiles.student.createorupdateprofile.CreateOrUpdateStudentProfileDao;
import com.mysabr.api.handlers.profiles.student.lookup.StudentGradeDao;
import com.mysabr.api.handlers.lookups.schools.SchoolLookupDao;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.inject.Produces;
import org.jdbi.v3.core.Jdbi;

@ApplicationScoped
public class StudentUserJdbiProducer {

    @Produces
    public CreateOrUpdateStudentProfileDao createOrUpdateStudentProfileDao(Jdbi jdbi) {
        return jdbi.onDemand(CreateOrUpdateStudentProfileDao.class);
    }

    @Produces
    public StudentGradeDao studentGradeDao(Jdbi jdbi) {
        return jdbi.onDemand(StudentGradeDao.class);
    }

    @Produces
    public SchoolLookupDao schoolLookupDao(Jdbi jdbi) {
        return jdbi.onDemand(SchoolLookupDao.class);
    }

    @Produces
    public EducatorRoleLookupDao educatorRoleLookupDao(Jdbi jdbi) {
        return jdbi.onDemand(EducatorRoleLookupDao.class);
    }

}
