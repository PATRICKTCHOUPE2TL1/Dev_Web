package motus;
/**
 * 
 * @author ProjetJava12 (Patrick Tchoupe)
 *2TL1
 */
public class Joueur {
	private String pseudo;
	private int score;
	private int essaisRestants;
	private Proposition essai;
	/**
	 * Constructeur par défaut du joueur
	 */
	public Joueur() {
		this.pseudo="";
		this.score=0;
		this.essaisRestants=0;
	}
	/**
	 * @return nom du joueur
	 */
	public String getPseudo() {
		return pseudo;
	}
	/**
	 * Attribue un pseudo au joueur
	 * @param pseudo
	 */
	public void setPseudo(String pseudo) {
		this.pseudo = pseudo;
	}
	/**
	 * renvoie le score du joueur 
	 * @return score
	 */
	public int getScore() {
		return score;
	}
	/**
	 * renvoie le nombre de tentatives restantes 
	 * @return essaisRestants
	 */
	public int getEssaisRestants() {
		return essaisRestants;
	}
	/**
	 * Met à jour le nombre d'essai restants
	 * @param essaisRestants
	 */
	public void setEssaisRestants(int essaisRestants) {
		this.essaisRestants = essaisRestants;
	}
	/**
	 * Incremente les points du joueur de 1
	 */
	public void score() {
		this.score++;
	}
	/**
	 * renvoie la proposition faite par le joueur
	 * @return
	 */
	public Mot proposerMot() {
		return essai;
	}
	public void setEssai(Proposition essai) {
		this.essai = essai;
	}
	/**
	 * affiche les informations relatives au joueur
	 */
	@Override
	public String toString() {
		return "Joueur =" + pseudo + ", score=" + score;
	}
	
	
	

}
