
package com.pixeldev.txlforma.repository;

import com.pixeldev.txlforma.model.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {
    List<Session> findByFormationId(Long formationId);

    List<Session> findByIntervenantUtilisateurId(Long utilisateurId);
}
