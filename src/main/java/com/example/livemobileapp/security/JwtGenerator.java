package com.example.livemobileapp.security;

import com.example.livemobileapp.model.User;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
@Slf4j
public class JwtGenerator {
    public static String generateToken(UserDetailsImpl user, String url, Date issuedAt, Date expiration)
    {
        String token = Jwts.builder()
                .setSubject(user.getUsername())
                .setIssuedAt(issuedAt)
                .setExpiration(expiration)
                .setIssuer(url)
                .claim("roles",user.getAuthorities())
                .signWith(SignatureAlgorithm.HS512,"secret")
                .compact();
        return token;
    }
    public static String generateToken(User user, String url, Date issuedAt, Date expiration)
    {
        String token = Jwts.builder()
                .setSubject(user.getUsername())
                .setIssuedAt(issuedAt)
                .setExpiration(expiration)
                .setIssuer(url)
                .claim("roles",new ArrayList<>())
                .signWith(SignatureAlgorithm.HS512,"secret")
                .compact();
        return token;
    }
    public static boolean validateToken(String token) throws IOException {
        try {
            Jwts.parser().setSigningKey("secret").parseClaimsJws(token);
            log.error(Boolean.toString(!isTokenExpired(token)));
            return !isTokenExpired(token);
        }
        catch (SignatureException | UnsupportedJwtException | IllegalArgumentException | ExpiredJwtException | MalformedJwtException exception)
        {
            log.error("Error logging in {}, ",exception.getMessage());
            return false;
        }
    }
    private static boolean isTokenExpired(String token){
        Date expiration = Jwts.parser().setSigningKey("secret").parseClaimsJws(token).getBody().getExpiration();
        return expiration.before(new Date());
    }
    public static Claims parseGetBody(String token)
    {
        return Jwts.parser().setSigningKey("secret").parseClaimsJws(token).getBody();
    }
}
