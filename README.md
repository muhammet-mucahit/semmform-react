## Auth0

<img src="https://www.drupal.org/files/project-images/auth0-logo-whitebg.png" alt="Auth0 Logo" width="400"/>

#### Frontend Kısmı

1. [Auth0](https://auth0.com/) web sayfasına gidilir.

2. Eğer bir **Auth0** hesabı varsa giriş yapılır, yoksa hesap oluşturulup ardından giriş sağlanır.

3. Soldaki menüden **Applications** linkine tıklanır ve ardından sağ üst köşede çıkan **Create Application** butonuna tıklanır. ![Auth0 Logo](/doc_images/auth0_create_application.png)

4. Butona tıklandıktan sonra menüden **Single Web Applications** tıklanıp uygulamaya bir isim verilir ve **Create** butonuna tıklanır. ![SPA Create App](/doc_images/spa_create_app.png)

5. Açılan ekrandan **Settings** linkine tıklanır ve uygulama ile ilgili bilgilerin görülebileceği ekrana girilir

6. Bu ekrandaki kritik bilgiler sonradan kullanılmak üzere kaydedilir. ![App Secrets](/doc_images/client_settings.png)

7. Uygulama ayarları ekranında aşağı doğru inildikçe React uygulamasının (SPA) çalışacağı host ve port bilgilerinin girilmesi gereklidir. Varsayılan çalışma kullanıcının kendi localinde 3000 portunda olacağı için ayar http://localhost:3000 olarak girilmiştir. Eğer uygulama farklı bir adreste çalıştırılacak ise buradaki adreslerin değiştirilmesi gereklidir. ![App Urls Permissions](/doc_images/app_urls.png)

8. Bütün değişikliklerin ardından sayfanın en altında yer alan Save Changes butonuna tıklanır ve değişiklikler kaydedilir.

#### API Kısmı

1. Auth0 web sayfasinda soldaki menüden APIs tıklandıktan sonra açılan sayfada sağ üstteki Create API butonuna tıklanır. ![Create API](/doc_images/auth0_api_part.png)

2. Açılan Popup'da API için gerekli isim ve daha sonra fronend uygulası içinde kullanılacak olan tanımlayıcı (identifier) bilgileri girilir. Bu adımda girilen identifier bilgisi daha sonra kullanılacağı için bir yere kaydedilir. ![Create API Popup](/doc_images/create_api_screen.png)


## Frontend Uygulaması (React SPA)

Frontend uygulamasının çalıştırılabilmesi için öncelikle sistemde React'ın kurulu ve çalışabiliyor olması gerekmektedir. React'ın kurulumuna dair örnek bir dökümana [linkten](https://www.tutorialspoint.com/reactjs/reactjs_environment_setup.htm) ulaşılabilir.

Frontend uygulamasını indirip, gerekli kütüphaneleri yüklemek için gerekli adımlar aşağıda verilmiştir.

```bash
git clone https://github.com/muhammet-mucahit/semmform-react
cd semmform-react
yarn add
```

`yarn` komutu çalışmadığı takdirde `npm` kullanılabilir.

```bash
npm install
```

Bu adımlar uygulandıktan sonra artık uygulama çalışmak için neredeyse tüm adımlara sahip.
Kodun içinde kullanılacak olan bazı değişkenlerin setlenmesi işleminin ardından uygulama çalışır hale gelecektir.
Öncelikle src dizini içerisinde `auth_config.json` isimli bir dosya oluşturulup, ardından aşağıdaki konfigürasyonların bu dosyaya girilmesi gerekmektedir.

```json
{
  "domain": "<AUTH0_SPA_APP_DOMAIN>",
  "clientId": "<AUTH0_SPA_APP_CLIENT_ID>",
  "audience": "<AUTH0_API_IDENTIFIER>"
}
```

Bu dosyanın içeriğinde `domain` kısmının AUTH0 işlemleri yapılırken daha sonra kullanılmak üzere kaydedilen React SPA uygulamasının Domain kısmı ile, `clientId` kısmının ise yime aynı aşamada kaydedilen Client ID bilgisi ile doldurulması gerekmektedir.

![Domain](/doc_images/domain.png)
![ClientID](/doc_images/client_id.png)

`audience` bilgisinin ise yine AUTH0 uygulaması içinde oluşturulan API'nin Identifier doldurulması gerekmektedir.

AUTH0 ile haberleşecek olan React uygulasına gereken bilgiler girildikten sonra son adım olarak arkada bu uygulamaya veriyi sunacak olan Django Rest API'nin konfigürasyonlarının girilmesi gerekmektedir. Bu aşamada ise yine aynı şekilde src dizini içinde `api_config.json` adlı bir dosya oluşturulur. Bu dosyanın içine backend uygulamasının (Django Rest API) veriyi sunacağı temel URL girilmelidir. Varsayılan durumda bu değer aşağıdaki gibi olacaktır.

```json
{
  "url": "http://localhost:8000/api/v1"
}
```

Artık bütün konfigürasyonlar da hazır hale geldiği için uygulama aşağıdaki herhangi bir komut ile çalıştırılabilir.

```bash
npm start
```

```bash
yarn start
```

Bütün bu işlemlerin sonucunda uygulama varsayılan olarak kullanıcın bilgisayarındaki lokal adresin 3000. portunda çalışmaya başlayacaktır.


## Backend Uygulaması (Django Rest)

Backend uygulamasının çalıştırılabilmesi için öncelikle sisteminizde Python3 ve PostgreSQL kurulu olması gerekmektedir. Bunların kurulumundan sonra uygulamanın çalıştırılması adımlarına geçilebilir.

#### Veritabanı (PostgreSQL)

Öncelikle backend uygulasında kullanacak olan veritabanının oluşturulması gerekmektedir.

```bash
createdb VERİTABANI_İSMİ
```

#### Virtual Environment

Python uygulamalarında sıkça kullanılan Virtual Environment kullanılarak geliştirme ortamı hazırlanır.

Backend uygulamasının indirilmesi ve gerekli kütüphanelerin yüklenmesi için gerekli adımlar aşağıda verilmiştir. 

```bash
git clone https://github.com/muhammet-mucahit/semmform-api
cd semmform-api
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### Ortam Değişkenleri (Environment Variables)

Yukarıdaki adımların ardından uygulamanın çalışabilmesi için gerekli ortam değişkenlerinin (environment variables) setlenmesi işleminın yapılması gerekmektedir.
Aşağıdaki komutlar bir dosyaya kaydedilip veya direkt olarak shell üzeriden çalıştırılabilir.

```bash
export DATABASE_NAME=<VERİTABANI_İSMİ>;
export DATABASE_HOST=<HOST>;
export DATABASE_PORT=<PORT>;
export AUTH0_DOMAIN=<AUTH0_SPA_APP_DOMAIN>;
export API_IDENTIFIER=<AUTH0_API_IDENTIFIER>;
export JWT_ISSUER=<JWT_ISSUER>;
export SECRET_KEY=<SECRET_KEY>;
```

Bu adımda 
* `DATABASE_NAME` kısmına daha önce oluşturulmuş olan veritabanı isminin, 
* `HOST` kısmına veritabanı sunucusunun calıştığı adresin (mesela 127.0.0.1), 
* `PORT` kısmına veritabanı sunucusunun çalıştığı portun (mesela 5432),
* `AUTH0_DOMAIN` kısmına daha önce frontend de yapılmış olan AUTH0 SPA uygulamasının domaininin (mesela full-stack.auth0.com), 
* `JWT_ISSUER` alanına bu domain alanına girilen değerin url halinin (mesela https://full-stack-3.auth0.com),
* `API_IDENTIFIER` kısmına daha önce yine frontend tarafında da yapılmış olan AUTH0 API uygulamasının Identifier bilgisinin,
* Son olarak `SECRET_KEY` alanına da Django uygulamasının kullanabilmesi için kimsenin bilmeyeceği benzersiz (unique) bir değerin girilmesi gerekmektedir.

#### Migration ve Çalıştırma

Ortam değişkenlerinin setlenmesi ardından migrationların yapılıp veritabanındaki tabloların hazır hale getirilmesi gerekmektedir.

```bash
python manage.py migrate
```

Bütün bu adımların akabinde uygulama çalışmaya hazır hale gelmiştir. Aşağıdaki komut yardımıyla uygulama, varsayılan olarak kullanıcının lokalindeki 8000 portunda çalışmaya başlayacaktır.

```bash
python manage.py runserver
```