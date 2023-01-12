export class AppConstants {

  public static get baseUrl(): string { return "https://crud-spring.onrender.com/"};

  //public static get baseUrl(): string { return "http://localhost:8081/"};

  public static get baseContext(): string { return this.baseUrl + "sahydi"};

  public static get baseLogin(): string { return this.baseContext + "/login"};

  public static get baseContactBook(): string { return this.baseContext + "/contact-book"};

}
