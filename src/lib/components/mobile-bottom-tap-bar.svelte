<script>
    import HomeIcon from '$lib/assets/shapehome.svg'
    import TimeIcon from '$lib/assets/time-mobile.svg'
    import PersonMobile from '$lib/assets/person-mobile.svg'
</script>

<div class="header sm:hidden">
    <div class="flex items-center justify-between w-full bg-white px-10 h-24 bottom-0 border-t border-gray-lines fixed">
      
      <div class="flex flex-row justify-start"> 
        <a href="#">
          <img src={HomeIcon} alt="Menu">
        </a>
      </div>
      
      <div class="flex flex-row justify-center">
        <a href=""><img src={TimeIcon} alt="LogoLinktic"></a>
      </div>
      
      <div class="flex flex-row justify-end">
        <a href=""><img src={PersonMobile} alt="Personal"></a>
      </div>
    
    </div>
  </div>