package com.mysabr.api.handlers.profiles.student.createorupdateprofile;

import org.jdbi.v3.sqlobject.customizer.BindBean;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;

public interface CreateOrUpdateStudentProfileDao {

    String UPSERT_STUDENT_USER_PROFILE =
            "INSERT INTO student_profiles (student_id, summary) " +
                    "VALUES (:id, :summary) " +
                    "ON CONFLICT (student_id) DO UPDATE SET " +
                    "summary = EXCLUDED.summary, " +
                    "last_updated_at = NOW()";

    @SqlUpdate(UPSERT_STUDENT_USER_PROFILE)
    int createOrUpdateStudentProfile(@BindBean CreateOrUpdateStudentProfileDbEntity studentProfile);
}
