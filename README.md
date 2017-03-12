# CivCiv
Kuluçka Makinesi (Incubation  machine) NodeJS App

Lamp control by DHT11 sensor (temp and humidity, BCM2835 required for DHT11) and Relay
Rotate control by sg90 servo
Web interface 

Turkish

Uygulama 21 günlük kuluçka dönemi için ayarlanmıştır,
Lamba kontrolü röle devresi kullanılarak yapılmıştır,
Sıcaklık durumuna göre 35 derecenin altına gelinmesi ile lamba çalışır 38 dereceye kadar ısıyı yükseltir sonra lamba kapanır,
3000 nolu porttan kuluçka kalan süre ve durum kontrol edilebilir,
Son 3 gün kala sıcaklık değeri 36-39 arası olacak şekilde ayarlanmıştır
İki saatte bir sg90 servo motor ile döndürme (küçük açı ile yatayda çevirme yaptım burada kişi kendisi bir yöntem belirleyebilir)